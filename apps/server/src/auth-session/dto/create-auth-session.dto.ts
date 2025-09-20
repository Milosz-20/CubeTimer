import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString
} from 'class-validator';

export class CreateAuthSessionDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  userId!: number;

  @IsString()
  @IsNotEmpty()
  refreshToken!: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  expiresAt!: Date;
}
