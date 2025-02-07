import { Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsDate,
  IsOptional,
  IsPhoneNumber,
  IsIn,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString() name: string;
  @IsEmail() email: string;

  @IsIn(['admin', 'user']) possition?: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  img?: string;

  @IsDate()
  @Type(() => Date)
  dob: Date;

  @IsPhoneNumber(null) phone: string;
  @IsIn(['male', 'female']) gender: string;
}
