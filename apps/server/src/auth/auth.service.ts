import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  register() {
    return 'I am registed';
  }
  login() {
    return 'I am loged in';
  }
}
