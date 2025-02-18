import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { articleProvider } from './article.provider';
import { ArticleSubcategoryModule } from '../article-subcategory/article-subcategory.module';

@Module({
  imports: [DatabaseModule, ArticleSubcategoryModule],
  controllers: [ArticleController],
  providers: [...articleProvider, ArticleService],
})
export class ArticleModule {}
