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
  @IsIn(['admin', 'user'])
  possition?: string;

  @ApiProperty({ minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  img?: string;

  @ApiProperty({ type: Date })
  @IsDate()
  @Type(() => Date)
  dob: Date;

  @ApiProperty()
  @IsPhoneNumber(null)
  phone: string;

  @ApiProperty({ enum: ['male', 'female'] })
  @IsIn(['male', 'female'])
  gender: string;
}
