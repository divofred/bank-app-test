import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './main.sqlite',
  synchronize: true,
  logging: false,
  entities: [User],
  subscribers: [],
  migrations: [],
});
