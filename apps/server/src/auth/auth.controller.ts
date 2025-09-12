import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  private setTokenCookie(res: Response, token: string, expiryMs: number) {
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: expiryMs
    });
  }

  private clearTokenCookie(res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  }

  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response
  ) {
    console.log(dto);
    const { access_token, expiryMs } = await this.authService.register(dto);
    this.setTokenCookie(res, access_token, expiryMs);
    return { message: 'Registration successful' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    console.log(`🔑 LOGIN attempt for user: ${dto.login}`);
    const { access_token, expiryMs } = await this.authService.login(dto);
    this.setTokenCookie(res, access_token, expiryMs);
    console.log(`✅ LOGIN successful for user: ${dto.login}`);
    return { message: 'Login successful' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    console.log(`🚪 LOGOUT request received`);
    this.clearTokenCookie(res);
    console.log(`✅ LOGOUT successful - cookie cleared`);
    return { message: 'Logout successful' };
  }
}
