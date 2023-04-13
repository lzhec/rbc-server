import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from '@task/task.module';
import { UserModule } from '@user/user.module';
import { RoleModule } from '@role/role.module';
import { AuthModule } from '@auth/auth.module';
import { AuthMiddleware } from '@auth/auth.middleware';

const IS_PROD = process.env.NODE_ENV === 'prod';

@Module({
  imports: [
    TaskModule,
    UserModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      database: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      entities: [],
      autoLoadEntities: true,
      synchronize: !IS_PROD,
      logging: ['error'],
    }),
    RoleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'api/auth/signup/client', method: RequestMethod.POST })
      .exclude({ path: 'api/auth/signup/employee', method: RequestMethod.POST })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
