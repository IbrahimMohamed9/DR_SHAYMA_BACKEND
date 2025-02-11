import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateUserLoginLocationDto {
  @ApiProperty({ example: '77.77.250.148' })
  @IsString()
  ipAddress: string;

  @IsNumber()
  @ApiProperty({ example: 1 })
  userId: number;
}
