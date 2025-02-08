import { PartialType } from '@nestjs/swagger';
import { CreateArticleSubcategoryDto } from './create-article-subcategory.dto';

export class UpdateArticleSubcategoryDto extends PartialType(CreateArticleSubcategoryDto) {}
