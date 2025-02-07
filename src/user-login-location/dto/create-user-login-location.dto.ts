import { IsNumber, IsString } from 'class-validator';

export class CreateUserLoginLocationDto {
  @IsString() ipAddress: string;
  @IsNumber() userId: number;
}
