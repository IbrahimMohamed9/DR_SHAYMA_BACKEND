import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateArticleSubcategoryDto {
  @ApiProperty()
  @IsString()
  subcategoryId: string;

  @ApiProperty()
  @IsString()
  categoryId: string;
}
