import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthSessionService } from 'src/auth-session/auth-session.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor(
    configService: ConfigService,
    private readonly authSessionService: AuthSessionService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies?.Refresh
      ]),
      secretOrKey: configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true
    });
  }

  async validate(request: Request, payload: { userId: number }) {
    return this.authSessionService.verifyUserRefreshToken(
      request.cookies?.Refresh,
      payload.userId
    );
  }
}
