import { DataSource } from 'typeorm';
import { ArticleCategory } from './entities/article-category.entity';

export const articleCategoryProviders = [
  {
    provide: 'ARTICLE_CATEGORY_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ArticleCategory),
    inject: ['DATA_SOURCE'],
  },
];
