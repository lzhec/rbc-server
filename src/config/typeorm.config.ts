import { DataSource, DataSourceOptions } from "typeorm";
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import databaseConfig from './database.config';

export const typeOrmConfig: TypeOrmModuleOptions = databaseConfig;

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return databaseConfig;
  },
};

// config();
//
// const IS_PROD = process.env.NODE_ENV === 'prod';
//
// const ENTITIES = [
//   'src/user/model/member.ts',
//   'src/user/model/user/user.ts',
//   'src/user/model/user/employee.ts',
//   'src/user/model/group/group.ts',
//   'src/user/model/group/employee-group.ts',
// ];
//
// const configService = new ConfigService();
//
// const databaseConfig: DataSourceOptions = {
//   type: 'postgres',
//   host: configService.get('POSTGRES_HOST'),
//   port: configService.get('POSTGRES_PORT'),
//   username: configService.get('POSTGRES_USER'),
//   password: configService.get('POSTGRES_PASSWORD'),
//   database: configService.get('POSTGRES_DB'),
//   entities: ENTITIES,
//   migrations: ['src/config/migration/*.ts'],
//   migrationsTableName: 'custom_migration_table',
//   extra: {
//     charset: 'utf8mb4_unicode_ci',
//   },
//   synchronize: !IS_PROD,
//   logging: ['error'],
// };
//
// export default new DataSource(databaseConfig);
