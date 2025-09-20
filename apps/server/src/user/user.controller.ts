import { Body, Controller, Get, Post } from '@nestjs/common';
// import { JwtGuard } from '../auth/guard';
import { User } from 'generated/prisma';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CurrentUser } from 'src/auth/decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getMe(@CurrentUser() user: User /*, @GetUser('email') email: string*/) {
    return user;
  }

  @Post('new')
  async createUser(@Body() request: CreateUserDto) {
    return this.userService.createUser(request);
  }
}
