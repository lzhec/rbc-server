import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { EmployeeController } from './employee.controller';
import { ClientController } from './client.controller';
import { UserService } from './user.service';
import { Employee } from './model/user/employee';
import { EmployeeGroup } from './model/group/employee-group';
import { Member } from './model/member';
import { User } from './model/user/user';
import { Group } from './model/group/group';
import { Contact } from './model/contact/contact';
import { Role } from '@role/model/role';
import { RoleModule } from '@role/role.module';
import { Client } from './model/user/client';

@Module({
  controllers: [UserController, EmployeeController, ClientController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      EmployeeGroup,
      Client,
      User,
      Group,
      Member,
      Contact,
      Role,
    ]),
    RoleModule,
  ],
  exports: [UserService],
})
export class UserModule {}
