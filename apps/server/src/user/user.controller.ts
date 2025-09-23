import { Controller, Get, Param, UseGuards } from '@nestjs/common';
// import { JwtGuard } from '../auth/guard';
import { User } from 'generated/prisma';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/decorator';
import { JwtAuthGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@CurrentUser() user: User /*, @GetUser('email') email: string*/) {
    return user;
  }

  @Get('uuid/:uuid')
  @UseGuards(JwtAuthGuard)
  async getUserByUUID(@Param('uuid') userId: string) {
    return this.userService.getUserByUUId(userId);
  }
}
