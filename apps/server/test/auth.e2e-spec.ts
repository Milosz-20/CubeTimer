import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";
import * as pactum from "pactum";

describe("Auth e2e", () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
    await app.listen(3334);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();

    pactum.request.setBaseUrl("http://localhost:3334");
  });

  afterAll(async () => {
    await app.close();
  });

  describe("Auth", () => {
    describe("Register", () => {
      it("should register a user", () => {
        return pactum
          .spec()
          .post("/auth/register")
          .withBody({
            username: "testuser",
            displayName: "Test User",
            email: "test@example.com",
            password: "password123"
          })
          .expectStatus(201)
          .expectBodyContains("access_token");
      });

      it("should not register with duplicate email", () => {
        return pactum
          .spec()
          .post("/auth/register")
          .withBody({
            username: "testuser2",
            displayName: "Test User 2",
            email: "test@example.com", // same email
            password: "password123"
          })
          .expectStatus(403);
      });

      it("should not register with duplicate username", () => {
        return pactum
          .spec()
          .post("/auth/register")
          .withBody({
            username: "testuser", // same username
            displayName: "Test User 3",
            email: "test3@example.com",
            password: "password123"
          })
          .expectStatus(403);
      });

      it("should register a second user with different credentials", () => {
        return pactum
          .spec()
          .post("/auth/register")
          .withBody({
            username: "testuser2",
            displayName: "Test User 2",
            email: "test2@example.com",
            password: "password456"
          })
          .expectStatus(201)
          .expectBodyContains("access_token");
      });
    });

    describe("Login", () => {
      it("should login with email", () => {
        return pactum
          .spec()
          .post("/auth/login")
          .withBody({ login: "test@example.com", password: "password123" })
          .expectStatus(200)
          .expectBodyContains("access_token");
      });

      it("should login with username", () => {
        return pactum
          .spec()
          .post("/auth/login")
          .withBody({ login: "testuser", password: "password123" })
          .expectStatus(200)
          .expectBodyContains("access_token");
      });

      it("should not login with wrong password (email)", () => {
        return pactum
          .spec()
          .post("/auth/login")
          .withBody({ login: "test@example.com", password: "wrongpassword" })
          .expectStatus(403);
      });

      it("should not login with wrong password (username)", () => {
        return pactum
          .spec()
          .post("/auth/login")
          .withBody({ login: "testuser", password: "wrongpassword" })
          .expectStatus(403);
      });

      it("should not login with non-existent email", () => {
        return pactum
          .spec()
          .post("/auth/login")
          .withBody({
            login: "nonexistent@example.com",
            password: "password123"
          })
          .expectStatus(403);
      });

      it("should not login with non-existent username", () => {
        return pactum
          .spec()
          .post("/auth/login")
          .withBody({ login: "nonexistentuser", password: "password123" })
          .expectStatus(403);
      });

      it("should not login with empty login", () => {
        return pactum
          .spec()
          .post("/auth/login")
          .withBody({ login: "", password: "password123" })
          .expectStatus(400);
      });

      it("should not login with empty password", () => {
        return pactum
          .spec()
          .post("/auth/login")
          .withBody({ login: "test@example.com", password: "" })
          .expectStatus(400);
      });

      it("should not login with missing login field", () => {
        return pactum
          .spec()
          .post("/auth/login")
          .withBody({ password: "password123" })
          .expectStatus(400);
      });

      it("should not login with missing password field", () => {
        return pactum
          .spec()
          .post("/auth/login")
          .withBody({ login: "test@example.com" })
          .expectStatus(400);
      });

      it("should handle case sensitivity for email login", () => {
        return pactum
          .spec()
          .post("/auth/login")
          .withBody({ login: "TEST@EXAMPLE.COM", password: "password123" })
          .expectStatus(403); // Should fail because email is case-sensitive in database
      });

      it("should handle case sensitivity for username login", () => {
        return pactum
          .spec()
          .post("/auth/login")
          .withBody({ login: "TESTUSER", password: "password123" })
          .expectStatus(403); // Should fail because username is case-sensitive in database
      });

      it("should login second user with email", () => {
        return pactum
          .spec()
          .post("/auth/login")
          .withBody({ login: "test2@example.com", password: "password456" })
          .expectStatus(200)
          .expectBodyContains("access_token");
      });

      it("should login second user with username", () => {
        return pactum
          .spec()
          .post("/auth/login")
          .withBody({ login: "testuser2", password: "password456" })
          .expectStatus(200)
          .expectBodyContains("access_token");
      });

      it("should not login second user with wrong password", () => {
        return pactum
          .spec()
          .post("/auth/login")
          .withBody({ login: "testuser2", password: "wrongpassword" })
          .expectStatus(403);
      });

      it("should not allow cross-user login (first user email, second user password)", () => {
        return pactum
          .spec()
          .post("/auth/login")
          .withBody({ login: "test@example.com", password: "password456" })
          .expectStatus(403);
      });

      it("should not allow cross-user login (second user email, first user password)", () => {
        return pactum
          .spec()
          .post("/auth/login")
          .withBody({ login: "test2@example.com", password: "password123" })
          .expectStatus(403);
      });
    });
  });
});
