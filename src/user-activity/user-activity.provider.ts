import { DataSource } from 'typeorm';
import { UserActivity } from './entities/user-activity.entity';

export const userActivityProviders = [
  {
    provide: 'USER_ACTIVITY_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserActivity),
    inject: ['DATA_SOURCE'],
  },
];
