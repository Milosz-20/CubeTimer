import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService
  ) {
    const secret = config.get('JWT_SECRET');
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.access_token;
        }
      ]),
      secretOrKey: secret
    });
  }

  async validate(payload: { sub: number; email: string; username: string }) {
    console.log(
      `🔍 JWT validation for user: ${payload.username} (ID: ${payload.sub})`
    );
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub }
    });

    if (!user) {
      console.log(
        `❌ JWT validation failed - user not found: ${payload.username}`
      );
      return null;
    }

    console.log(`✅ JWT validation successful for: ${user.username}`);
    const { passwordHash, ...userWithoutHash } = user;
    return userWithoutHash;
  }
}
