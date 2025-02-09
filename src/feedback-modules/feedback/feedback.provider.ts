import { DataSource } from 'typeorm';
import { Feedback } from './entities/feedback.entity';

export const feedbackProviders = [
  {
    provide: 'FEEDBACK_REPOSITORY',
    useFactory: (datasource: DataSource) => datasource.getRepository(Feedback),
    inject: ['DATA_SOURCE'],
  },
];
