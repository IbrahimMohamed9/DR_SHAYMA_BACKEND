import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateArticleSubcategoryDto {
  @ApiProperty()
  @IsString()
  subcategoryEn: string;

  @ApiProperty()
  @IsString()
  subcategoryAr: string;

  @ApiProperty()
  @IsNumber()
  categoryId: number;
}
