import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOTS,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/entities/*.*{.ts, .js}'],
  migrations: ['src/migrations/*{.ts, .js}'],
  logging: true,
  synchronize: false,
});
