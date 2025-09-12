import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from 'generated/prisma';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: User /*, @GetUser('email') email: string*/) {
    console.log(
      `👤 GET /users/me - User authenticated: ${user.username} (${user.email})`
    );
    return user;
  }
}
