import { DataSource } from 'typeorm';
import { Article } from './entities/article.entity';

export const articleProvider = [
  {
    provide: 'ARTICLE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Article),
    inject: ['DATA_SOURCE'],
  },
];
