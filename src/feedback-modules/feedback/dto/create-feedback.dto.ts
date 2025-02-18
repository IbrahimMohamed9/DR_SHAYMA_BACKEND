import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  categoryId: string;

  @ApiProperty({ required: false })
  @IsString()
  name: string;

  @ApiProperty({ required: false, example: 'ibrahim@gmail.com' })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false, example: '+387 60 34 12 169' })
  @IsOptional()
  @IsPhoneNumber(null)
  phoneNumber: string;
}
