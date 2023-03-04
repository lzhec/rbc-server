import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';

const ENTITIES = [
  'src/user/model/member.ts',
  'src/user/model/user/user.ts',
  'src/user/model/user/employee.ts',
  'src/user/model/group/group.ts',
  'src/user/model/group/employee-group.ts',
];

const databaseConfig: DataSourceOptions = {
  name: 'default',
  type: 'postgres',
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: ENTITIES,
  migrations: ['src/config/migration/*.ts'],
  migrationsTableName: 'custom_migration_table',
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: false,
  logging: ['error'],
  migrationsRun: true,
};

export default databaseConfig;
