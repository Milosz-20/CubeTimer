import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuthSessionDto } from './dto/create-auth-session.dto';

@Injectable()
export class AuthSessionService {
  private readonly logger = new Logger(AuthSessionService.name);

  constructor(private prisma: PrismaService) {}

  async createSession(authSession: CreateAuthSessionDto) {
    try {
      return await this.prisma.authSession.create({
        data: {
          userId: authSession.userId,
          refreshToken: authSession.refreshToken,
          expiresAt: authSession.expiresAt
        }
      });
    } catch (error: any) {
      this.logger.error('Failed to create user:', {
        error: error.message,
        userId: authSession.userId,
        refreshToken: authSession.refreshToken,
        expiresAt: authSession.expiresAt
      });
      throw error;
    }
  }

  findValidSession() {}

  async deleteSessionById(refreshToken: string) {
    try {
      return await this.prisma.authSession.delete({ where: { refreshToken } });
    } catch (error: any) {
      this.logger.error('Failed to delete session:', {
        error: error.message,
        refreshToken: refreshToken.substring(0, 10) + '...' // Log only part for security
      });
      throw error;
    }
  }

  deleteAllUserSessions() {}

  updateLastActivity() {}
}
