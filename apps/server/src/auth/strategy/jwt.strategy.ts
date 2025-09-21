import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private readonly userService: UserService
  ) {
    const secret = config.getOrThrow('JWT_ACCESS_TOKEN_SECRET');
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies?.Authentication;
        }
      ]),
      secretOrKey: secret
    });
  }

  async validate(payload: { userId: number }) {
    return this.userService.getUserById(payload.userId);
  }
}
