import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { CurrentUser } from './decorator';
import { User } from 'generated/prisma';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './guard';
import { RegisterUserDto } from './dto';

import { JwtRefreshAuthGuard } from './guard/jwt-refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response
  ) {
    return await this.authService.login(user, response);
  }

  @Post('register')
  async createUser(@Body() request: RegisterUserDto) {
    return this.authService.register(request);
  }

  @Post('signout')
  @UseGuards(JwtAuthGuard)
  async signOut(
    @CurrentUser() user: any,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    return await this.authService.signOut(user.id, request, response);
  }

  @Post('signout/all')
  @UseGuards(JwtAuthGuard)
  async signOutAll(
    @CurrentUser() user: any,
    @Res({ passthrough: true }) response: Response
  ) {
    return await this.authService.signOutAll(user.id, response);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  async refresh(
    @CurrentUser() user: User,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    const oldRefreshToken = request.cookies?.Refresh;
    return await this.authService.refreshTokens(
      user,
      oldRefreshToken,
      response
    );
  }
}
