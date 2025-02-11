import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: +process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_USER_PASSWORD,
        database: process.env.DB_NAME,
        entities: [
          __dirname + '/../**/entities/*.entity{.ts,.js}',
          __dirname + '/../**/**/entities/*.entity{.ts,.js}',
        ],
        synchronize: true,
        // dropSchema: true,
      });

      return dataSource.initialize();
    },
  },
];
