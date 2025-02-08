import { DataSource } from 'typeorm';
import { Volunteer } from './entities/volunteer.entity';

export const volunteerProviders = [
  {
    provide: 'VOLUNTEER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Volunteer),
    inject: ['DATA_SOURCE'],
  },
];
