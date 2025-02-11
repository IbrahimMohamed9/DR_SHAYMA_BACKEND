import { ApiProperty } from '@nestjs/swagger';
import { ArticleCategory } from 'src/article-modules/article-category/entities/article-category.entity';
import { Article } from 'src/article-modules/article/entities/article.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class ArticleSubcategory {
  @ApiProperty()
  @PrimaryColumn({ name: 'subcategory_id' })
  subcategoryId: string;

  @ApiProperty()
  @Column({ name: 'category_id' })
  categoryId: string;

  @ApiProperty({ type: () => ArticleCategory })
  @ManyToOne(
    () => ArticleCategory,
    (articleCategory) => articleCategory.subcategories,
  )
  @JoinColumn({ name: 'category_id' })
  category: ArticleCategory;

  @ApiProperty({ type: () => Article, isArray: true })
  @OneToMany(() => Article, (article) => article.subcategory)
  articles: Article[];
}
