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

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
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
        path: '/api/auth/refresh'
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

  async signOut(request: Request, response: Response) {
    try {
      const refreshToken = request.cookies['Refresh']; // Pobierz z ciasteczka

      if (refreshToken) {
        await this.authSessionService.deleteSessionById(refreshToken);
      }

      response.clearCookie('Authentication');
      response.clearCookie('Refresh');
      response.status(200).json({ message: 'Successfully signed out' });
    } catch (error: any) {
      this.logger.error('Sign out error:', {
        error: error.message,
        stack: error.stack
      });
      throw new UnauthorizedException('Failed to process sign out');
    }
  }
}
