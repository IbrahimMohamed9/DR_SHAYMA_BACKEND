import { ApiProperty } from '@nestjs/swagger';
import { ArticleSubcategory } from 'src/article-subcategory/entities/article-subcategory.entity';
import { Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class ArticleCategory {
  @ApiProperty()
  @PrimaryColumn({ name: 'category_id' })
  categoryId: string;

  @ApiProperty({ type: () => ArticleSubcategory, isArray: true })
  @OneToMany(
    () => ArticleSubcategory,
    (articleSubcategory) => articleSubcategory.category,
  )
  subcategories: ArticleSubcategory[];
}
