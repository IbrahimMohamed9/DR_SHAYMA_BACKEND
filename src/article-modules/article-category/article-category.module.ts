import { Module } from '@nestjs/common';
import { ArticleCategoryService } from './article-category.service';
import { ArticleCategoryController } from './article-category.controller';
import { DatabaseModule } from 'src/database/database.module';
import { articleCategoryProviders } from './article-category.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ArticleCategoryController],
  providers: [...articleCategoryProviders, ArticleCategoryService],
})
export class ArticleCategoryModule {}
