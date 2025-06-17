import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  register() {
    return this.authService.register();
  }

  @Post('signup')
  login() {
    return this.authService.login();
  }
}
