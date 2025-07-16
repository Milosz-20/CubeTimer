import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "generated/prisma";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({ datasources: { db: { url: config.get("DATABASE_URL") } } });
  }

  async cleanDb() {
    // Delete in order due to foreign key constraints
    await this.solve.deleteMany();
    await this.session.deleteMany();
    await this.user.deleteMany();
  }
}
