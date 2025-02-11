import { DataSource } from 'typeorm';
import { FeedbackCategory } from './entities/feedback-category.entity';

export const feedbackCategoryProviders = [
  {
    provide: 'FEEDBACK_CATEGORY_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(FeedbackCategory),
    inject: ['DATA_SOURCE'],
  },
];
