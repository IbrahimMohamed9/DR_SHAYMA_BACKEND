import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ required: false })
  @IsUrl()
  img?: string;

  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsUrl()
  @ApiProperty()
  downloadLink: string;
}
