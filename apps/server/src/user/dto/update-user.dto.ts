import { PartialType } from '@nestjs/mapped-types';
import { RegisterUserDto } from 'src/auth/dto';

export class UpdateUserDto extends PartialType(RegisterUserDto) {
  refreshToken!: string;
}
