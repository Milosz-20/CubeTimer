import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto, LoginDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "generated/prisma/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AuthUtils } from "./utils";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}
  async register(dto: RegisterDto) {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          nickname: dto.nickname,
          email: dto.email,
          passwordHash: hash
        }
      });
      return this.signToken(user.id, user.email, user.username);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException("Credentials already taken");
        }
      }
      throw error;
    }
  }
  async login(dto: LoginDto) {
    const isEmail = dto.login.includes("@");
    const loginMethod = isEmail
      ? { email: dto.login }
      : { username: dto.login };
    const user = await this.prisma.user.findUnique({ where: loginMethod });
    if (!user) {
      throw new ForbiddenException("Credentials incorrect");
    }
    const pwMatches = await argon.verify(user.passwordHash, dto.password);
    if (!pwMatches) {
      throw new ForbiddenException("Credentials incorrect");
    }
    return this.signToken(user.id, user.email, user.username);
  }

  async signToken(
    userId: number,
    email: string,
    username: string
  ): Promise<{ access_token: string; expiryMs: number }> {
    const payload = { sub: userId, email, username };
    const secret = this.config.get("JWT_SECRET");
    const expiryMinutes = this.config.get("JWT_EXPIRY_MINUTES");

    const token = await this.jwt.signAsync(payload, {
      expiresIn: AuthUtils.getJwtExpiryString(expiryMinutes),
      secret: secret
    });
    return {
      access_token: token,
      expiryMs: AuthUtils.getJwtExpiryMs(expiryMinutes)
    };
  }
}
