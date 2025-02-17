import { ApiProperty } from '@nestjs/swagger';
import { ArticleCategory } from 'src/article-modules/article-category/entities/article-category.entity';
import { Article } from 'src/article-modules/article/entities/article.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ArticleSubcategory {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'subcategory_id' })
  subcategoryId: number;

  @ApiProperty()
  @Column({ name: 'subcategory_en', unique: true })
  subcategoryEn: string;

  @ApiProperty()
  @Column({ name: 'subcategory_ar', unique: true })
  subcategoryAr: string;

  @ApiProperty()
  @Column({ name: 'category_id' })
  categoryId: number;

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
