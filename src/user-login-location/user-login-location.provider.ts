import { DataSource } from 'typeorm';
import { UserLoginLocation } from './entities/user-login-location.entity';

export const userLoginLocationProvider = [
  {
    provide: 'USER_LOGIN_LOCATION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserLoginLocation),
    inject: ['DATA_SOURCE'],
  },
];
