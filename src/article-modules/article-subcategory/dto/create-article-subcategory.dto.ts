import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleSubcategoryDto {
  @ApiProperty()
  subcategoryId: string;

  @ApiProperty()
  categoryId: string;
}
