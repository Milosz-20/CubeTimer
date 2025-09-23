import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuthSessionDto } from './dto/create-auth-session.dto';
import * as argon from 'argon2';

@Injectable()
export class AuthSessionService {
  private readonly logger = new Logger(AuthSessionService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async createSession(authSession: CreateAuthSessionDto) {
    try {
      return await this.prismaService.authSession.create({
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

      const sessions = await this.prismaService.authSession.findMany({
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
            return await this.prismaService.authSession.update({
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
      const allUserSessions = await this.prismaService.authSession.count({
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
      const sessions = await this.prismaService.authSession.findMany({
        where: { userId: userId, expiresAt: { gt: new Date() } }
      });

      this.logger.debug(
        `Found ${sessions.length} active sessions for user ${userId}`
      );
      if (sessions.length === 0) {
        this.logger.warn(`No active sessions found for user ${userId}`);
        return null;
      }

      return await this.prismaService.authSession.updateMany({
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

  async verifyUserRefreshToken(
    refreshToken: string,
    userId: number
  ): Promise<Omit<any, 'passwordHash'>> {
    try {
      // Znajdź aktywne sesje użytkownika
      const sessions = await this.prismaService.authSession.findMany({
        where: {
          userId: userId,
          isRevoked: false,
          expiresAt: { gt: new Date() } // Tylko niewyganłe sesje
        },
        include: {
          user: {
            select: {
              id: true,
              uuid: true,
              username: true,
              nickname: true,
              email: true,
              createdAt: true
            }
          }
        }
      });

      if (sessions.length === 0) {
        this.logger.warn(`No active sessions found for user ${userId}`);
        throw new UnauthorizedException('No active sessions found');
      }

      // Sprawdź czy któryś z refresh tokenów pasuje
      for (const session of sessions) {
        try {
          const refreshTokenMatches = await argon.verify(
            session.refreshToken,
            refreshToken
          );

          if (refreshTokenMatches) {
            this.logger.log(
              `Refresh token verified successfully for user ${userId}`
            );
            return session.user;
          }
        } catch (error: any) {
          this.logger.debug(
            `Token verification failed for session ${session.id}: ${error.message}`
          );
          continue;
        }
      }

      throw new UnauthorizedException('Refresh token does not match');
    } catch (error: any) {
      this.logger.error('Verify user refresh token error', {
        error: error.message,
        userId,
        refreshToken: refreshToken
          ? refreshToken.substring(0, 10) + '...'
          : 'null'
      });
      throw new UnauthorizedException('Refresh token is not valid');
    }
  }

  async findUserByUuidRefreshToken(
    refreshToken: string
  ): Promise<Omit<any, 'passwordHash'>> {
    try {
      const sessions = await this.prismaService.authSession.findMany({
        where: { isRevoked: false, expiresAt: { gt: new Date() } },
        include: {
          user: {
            select: {
              id: true,
              uuid: true,
              username: true,
              nickname: true,
              email: true,
              createdAt: true
            }
          }
        }
      });

      if (sessions.length === 0) {
        this.logger.warn('No active sessions found at all');
        throw new UnauthorizedException('No active sessions found');
      }

      for (const session of sessions) {
        const match = await argon.verify(session.refreshToken, refreshToken);
        if (match) {
          this.logger.log(
            `Refresh token verified successfully for user ${session.user.id}`
          );
          return session.user;
        }
      }

      throw new UnauthorizedException('Refresh token does not match');
    } catch (error: any) {
      this.logger.error('Verify refresh token by UUID error', {
        error: error.message,
        refreshToken: refreshToken
          ? refreshToken.substring(0, 10) + '...'
          : 'null'
      });
      throw new UnauthorizedException('Refresh token is not valid');
    }
  }

  async updateSessionRefreshToken(
    userId: number,
    oldRefreshToken: string,
    newRefreshTokenHash: string,
    newExpiresAt: Date
  ) {
    try {
      if (!oldRefreshToken) {
        this.logger.warn(`No old refresh token provided for user ${userId}`);
        throw new UnauthorizedException('Invalid refresh token');
      }

      const sessions = await this.prismaService.authSession.findMany({
        where: {
          isRevoked: false,
          userId: userId,
          expiresAt: { gt: new Date() } // Tylko niewyganłe sesje
        }
      });

      this.logger.debug(
        `Found ${sessions.length} active sessions for user ${userId} to update`
      );

      if (sessions.length === 0) {
        this.logger.warn(`No active sessions found for user ${userId}`);
        throw new UnauthorizedException('No active sessions found');
      }

      for (const session of sessions) {
        try {
          const isMatch = await argon.verify(
            session.refreshToken,
            oldRefreshToken
          );

          if (isMatch) {
            this.logger.log(
              `Updating session ${session.id} for user ${userId}`
            );
            return await this.prismaService.authSession.update({
              where: { id: session.id },
              data: {
                refreshToken: newRefreshTokenHash,
                expiresAt: newExpiresAt
              }
            });
          }
        } catch (error: any) {
          this.logger.debug(
            `Token verification failed for session ${session.id}: ${error.message}`
          );
          continue;
        }
      }

      this.logger.warn(
        `No matching session found for refresh token update - user: ${userId}`
      );
      throw new UnauthorizedException('Invalid refresh token');
    } catch (error: any) {
      this.logger.error('Failed to update session refresh token:', {
        error: error.message,
        userId,
        refreshToken: oldRefreshToken
          ? oldRefreshToken.substring(0, 10) + '...'
          : 'null'
      });
      throw error;
    }
  }

  updateLastActivity() {}
}
