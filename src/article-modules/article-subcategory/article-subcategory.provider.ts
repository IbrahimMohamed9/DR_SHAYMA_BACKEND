import { DataSource } from 'typeorm';
import { ArticleSubcategory } from './entities/article-subcategory.entity';

export const articleSubcategoryProviders = [
  {
    provide: 'ARTICLE_SUBCATEGORY_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ArticleSubcategory),
    inject: ['DATA_SOURCE'],
  },
];
