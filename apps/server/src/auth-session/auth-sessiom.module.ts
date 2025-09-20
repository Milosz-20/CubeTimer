import { Module } from '@nestjs/common';
import { AuthSessionService } from './auth-session.service';
import { AuthSessionController } from './auth-session.controller';

@Module({
  providers: [AuthSessionService],
  controllers: [AuthSessionController],
  exports: [AuthSessionService]
})
export class AuthSessionModule {}
