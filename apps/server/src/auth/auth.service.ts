import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async register(dto: RegisterDto) {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          displayName: dto.displayName,
          email: dto.email,
          passwordHash: hash,
        },
      });
      const { passwordHash, ...userWithoutHash } = user;
      return userWithoutHash;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials already taken');
        }
        throw error;
      }
    }
  }
  async login(dto: LoginDto) {
    const isEmail = dto.login.includes('@');
    const loginMethod = isEmail
      ? { email: dto.login }
      : { username: dto.login };
    const user = await this.prisma.user.findUnique({
      where: loginMethod,
    });
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }
    const pwMatches = await argon.verify(user.passwordHash, dto.password);
    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }
    const { passwordHash, ...userWithoutHash } = user;
    return userWithoutHash;
  }
}
