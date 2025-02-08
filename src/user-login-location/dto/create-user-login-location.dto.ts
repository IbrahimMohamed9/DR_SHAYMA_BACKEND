import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateUserLoginLocationDto {
  @IsString()
  ipAddress: string;

  @IsNumber()
  @ApiProperty({ example: 1 })
  userId: number;
}
