import { Module } from '@nestjs/common';
import { ArticleSubcategoryService } from './article-subcategory.service';
import { ArticleSubcategoryController } from './article-subcategory.controller';
import { DatabaseModule } from 'src/database/database.module';
import { articleSubcategoryProviders } from './article-subcategory.provider';
import { ArticleCategoryModule } from '../article-category/article-category.module';

@Module({
  imports: [DatabaseModule, ArticleCategoryModule],
  controllers: [ArticleSubcategoryController],
  providers: [...articleSubcategoryProviders, ArticleSubcategoryService],
  exports: [ArticleSubcategoryService],
})
export class ArticleSubcategoryModule {}
