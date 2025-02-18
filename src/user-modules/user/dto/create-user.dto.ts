import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsIn,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ enum: ['admin', 'user'], default: 'user' })
  @IsOptional()
  @IsIn(['admin', 'user'])
  role?: string;

  @ApiProperty({ minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ type: Date, example: '1998-12-18' })
  @IsDate()
  @Type(() => Date)
  dob: Date;

  @ApiProperty({ example: '+201110472777' })
  @IsPhoneNumber(null)
  phone: string;

  @ApiProperty({ enum: ['male', 'female'] })
  @IsIn(['male', 'female'])
  gender: string;
}
