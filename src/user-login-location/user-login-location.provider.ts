import { DataSource } from 'typeorm';
import { UserLoginLocation } from './entities/user-login-location.entity';

export const userLoginLocationProviders = [
  {
    provide: 'USER_LOGIN_LOCATION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserLoginLocation),
    inject: ['DATA_SOURCE'],
  },
];
