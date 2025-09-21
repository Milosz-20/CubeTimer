import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuthSessionDto } from './dto/create-auth-session.dto';
import * as argon from 'argon2';

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

  async revokeSession(userId: number, refreshToken: string) {
    try {
      if (!refreshToken) {
        this.logger.warn(`No refresh token provided for user ${userId}`);
        return null;
      }

      const sessions = await this.prisma.authSession.findMany({
        where: {
          isRevoked: false,
          userId: userId,
          expiresAt: { gt: new Date() } // Tylko niewyganłe sesje
        }
      });

      this.logger.debug(
        `Found ${sessions.length} active sessions for user ${userId}`
      );

      if (sessions.length === 0) {
        this.logger.warn(`No active sessions found for user ${userId}`);
        return null;
      }

      this.logger.debug(
        `Comparing refresh token: ${refreshToken.substring(0, 10)}... against ${sessions.length} sessions`
      );

      for (const session of sessions) {
        try {
          this.logger.debug(`Comparing against session (ID: ${session.id})`);

          const isMatch = await argon.verify(
            session.refreshToken,
            refreshToken
          );

          this.logger.debug(
            `Session ${session.id} comparison result: ${isMatch}`
          );

          if (isMatch) {
            this.logger.log(`Session revoked successfully for user ${userId}`);
            return await this.prisma.authSession.update({
              where: { id: session.id },
              data: { isRevoked: true }
            });
          }
        } catch (error: any) {
          this.logger.debug(
            `Token verification failed for session ${session.id}: ${error.message}`
          );
          continue;
        }
      }

      // Sesja nie została znaleziona - sprawdź czy może być już odwołana lub wygasła
      const allUserSessions = await this.prisma.authSession.count({
        where: { userId: userId }
      });

      this.logger.warn(
        `Session not found for revocation - user: ${userId}, total user sessions: ${allUserSessions}`
      );
      return null;
    } catch (error: any) {
      this.logger.error('Failed to revoke session:', {
        error: error.message,
        userId,
        refreshToken: refreshToken
          ? refreshToken.substring(0, 10) + '...'
          : 'null'
      });
      throw error;
    }
  }

  async revokeAllUserSessions(userId: number) {
    try {
      const sessions = await this.prisma.authSession.findMany({
        where: { userId: userId, expiresAt: { gt: new Date() } }
      });

      this.logger.debug(
        `Found ${sessions.length} active sessions for user ${userId}`
      );
      if (sessions.length === 0) {
        this.logger.warn(`No active sessions found for user ${userId}`);
        return null;
      }

      return await this.prisma.authSession.updateMany({
        where: { userId: userId },
        data: { isRevoked: true }
      });
    } catch (error: any) {
      this.logger.debug(
        `Revoking all sessions failed for user ${userId}: ${error.message}`
      );
      return null;
    }
  }

  updateLastActivity() {}
}
