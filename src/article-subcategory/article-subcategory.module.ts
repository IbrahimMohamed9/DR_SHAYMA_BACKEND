import { Module } from '@nestjs/common';
import { ArticleSubcategoryService } from './article-subcategory.service';
import { ArticleSubcategoryController } from './article-subcategory.controller';
import { DatabaseModule } from 'src/database/database.module';
import { articleSubcategoryProviders } from './article-subcategory.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ArticleSubcategoryController],
  providers: [...articleSubcategoryProviders, ArticleSubcategoryService],
})
export class ArticleSubcategoryModule {}
