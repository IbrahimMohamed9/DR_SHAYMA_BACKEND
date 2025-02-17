import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateArticleCategoryDto {
  @ApiProperty()
  @IsString()
  categoryEn: string;

  @ApiProperty()
  @IsString()
  categoryAr: string;
}
