import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateArticleSubcategoryDto } from './create-article-subcategory.dto';

export class UpdateArticleSubcategoryDto extends PartialType(
  CreateArticleSubcategoryDto,
) {
  @ApiProperty()
  subcategoryId: number;
}
