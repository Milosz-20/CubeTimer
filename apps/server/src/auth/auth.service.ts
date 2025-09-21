import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { UserService } from '../user/user.service';
import { User } from '../../generated/prisma';
import { AuthUtils } from './utils';
import * as argon from 'argon2';
import { randomUUID } from 'crypto';
import { AuthSessionService } from 'src/auth-session/auth-session.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from './dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly authSessionService: AuthSessionService
  ) {}

  async login(user: User, response: Response) {
    try {
      const jwtAccessSecret = this.configService.getOrThrow(
        'JWT_ACCESS_TOKEN_SECRET'
      );
      const accessExpirationMs = AuthUtils.msFromMinutes(
        parseInt(
          this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRY_MINUTES')
        )
      );
      const refreshExpirationMs = AuthUtils.msFromDays(
        parseInt(this.configService.getOrThrow('JWT_REFRESH_TOKEN_EXPIRY_DAYS'))
      );
      const expiresAccessToken = new Date(Date.now() + accessExpirationMs);
      const expiresRefreshToken = new Date(Date.now() + refreshExpirationMs);

      const tokenPayload = { userId: user.id };

      const accessToken = this.jwtService.sign(tokenPayload, {
        secret: jwtAccessSecret,
        expiresIn: `${accessExpirationMs}ms`
      });

      const refreshToken = randomUUID();

      const userData = {
        id: user.id,
        uuid: user.uuid,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt
      };

      await this.authSessionService.createSession({
        userId: user.id,
        refreshToken: await argon.hash(refreshToken),
        expiresAt: expiresRefreshToken
      });

      response.cookie('Authentication', accessToken, {
        httpOnly: true,
        secure: this.configService.get('NODE_ENV') === 'production',
        expires: expiresAccessToken,
        path: '/'
      });

      response.cookie('Refresh', refreshToken, {
        httpOnly: true,
        secure: this.configService.get('NODE_ENV') === 'production',
        expires: expiresRefreshToken,
        path: '/api/auth'
      });

      return userData;
    } catch (error: any) {
      this.logger.error('Login error:', {
        error: error.message,
        userId: user.id,
        stack: error.stack
      });
      throw new UnauthorizedException(
        'Failed to process login. Please try again.'
      );
    }
  }

  async register(user: RegisterUserDto) {
    try {
      const hashedPassword = await argon.hash(user.password);
      const uuid = randomUUID();

      return await this.prismaService.user.create({
        data: {
          uuid,
          username: user.username,
          email: user.email,
          nickname: user.nickname,
          passwordHash: hashedPassword // Note: schema uses passwordHash
        },
        select: {
          id: true,
          uuid: true,
          username: true,
          nickname: true,
          email: true,
          createdAt: true
        }
      });
    } catch (error: any) {
      this.logger.error('Failed to create user:', {
        error: error.message,
        username: user.username,
        email: user.email
      });
      throw error;
    }
  }

  async verifyUser(login: string, password: string) {
    try {
      const isEmail = login.includes('@');
      const user = isEmail
        ? await this.userService.getUserByEmail(login)
        : await this.userService.getUserByUsername(login);

      if (!user) {
        throw new UnauthorizedException('Credentials incorrect');
      }

      const authenticated = await argon.verify(user.passwordHash, password);
      if (!authenticated) {
        throw new UnauthorizedException('Credentials incorrect');
      }

      return user;
    } catch (error) {
      this.logger.error('Verify user error', error);
      throw new UnauthorizedException('Credentials are not valid');
    }
  }

  async signOut(userId: number, request: Request, response: Response) {
    try {
      const refreshToken = request.cookies['Refresh']; // Pobierz z ciasteczka

      this.logger.debug(
        `SignOut for user ${userId}, refresh token present: ${!!refreshToken}`
      );
      if (refreshToken) {
        this.logger.debug(`Refresh token: ${refreshToken.substring(0, 10)}...`);
      }

      if (refreshToken) {
        await this.authSessionService.revokeSession(
          userId,
          refreshToken // Przekaż raw token, nie hash!
        );
      } else {
        this.logger.warn(
          `No refresh token found in cookies for user ${userId}`
        );
      }

      response.clearCookie('Authentication', { path: '/' });
      response.clearCookie('Refresh', { path: '/api/auth' });

      return { message: 'Successfully signed out' };
    } catch (error: any) {
      this.logger.error('Sign out error:', {
        error: error.message,
        stack: error.stack
      });
      throw new UnauthorizedException('Failed to process sign out');
    }
  }

  async signOutAll(userId: number, response: Response) {
    try {
      if (!userId || userId < 0) {
        throw new Error('User id is not valid, could not revoke all sessions');
      }
      this.logger.debug(`SignOutAll for user ${userId}`);

      await this.authSessionService.revokeAllUserSessions(userId);

      // Wyczyść cookies
      response.clearCookie('Authentication', { path: '/' });
      response.clearCookie('Refresh', { path: '/api/auth' });

      return { message: 'Successfully signed out from all devices' };
    } catch (error: any) {
      this.logger.error('Sign out all error:', {
        error: error.message,
        stack: error.stack,
        userId
      });
      throw new UnauthorizedException(
        'Failed to process sign out from all devices'
      );
    }
  }
}
