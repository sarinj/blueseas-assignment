import 'reflect-metadata';
import { config as loadEnvironment } from 'dotenv';
import { DataSource } from 'typeorm';

import {
  getPostgresExtraConfig,
  getPostgresSslConfig,
} from './postgres-ssl.config';

loadEnvironment();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required to initialize the TypeORM data source');
}

const ssl = getPostgresSslConfig(
  process.env.DATABASE_URL,
  process.env.DATABASE_SSL,
);
const extra = getPostgresExtraConfig(process.env.DATABASE_URL);

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ...(ssl === undefined ? {} : { ssl }),
  ...(Object.keys(extra).length === 0 ? {} : { extra }),
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
});
