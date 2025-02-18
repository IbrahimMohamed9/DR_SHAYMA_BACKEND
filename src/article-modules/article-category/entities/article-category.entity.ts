import { ApiProperty } from '@nestjs/swagger';
import { ArticleSubcategory } from 'src/article-modules/article-subcategory/entities/article-subcategory.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ArticleCategory {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'category_id' })
  categoryId: number;

  @ApiProperty()
  @Column({ name: 'category_en', unique: true })
  categoryEn: string;

  @ApiProperty()
  @Column({ name: 'category_ar', unique: true })
  categoryAr: string;

  @ApiProperty({ type: () => ArticleSubcategory, isArray: true })
  @OneToMany(
    () => ArticleSubcategory,
    (articleSubcategory) => articleSubcategory.category,
    { cascade: true, onDelete: 'CASCADE' },
  )
  subcategories: ArticleSubcategory[];
}
