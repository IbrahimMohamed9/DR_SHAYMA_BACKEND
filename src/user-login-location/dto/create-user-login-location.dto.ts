import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateUserLoginLocationDto {
  @IsString() ipAddress: string;
  @IsNumber() userId: number;

  @IsDate()
  @Type(() => Date)
  loginTime: Date;
}
