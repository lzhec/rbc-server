import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { ServiceController } from '@task/service.controller';
import { TaskTypeController } from '@task/task-type.controller';
import { StatusController } from '@task/status.controller';
import { PriorityController } from '@task/priority.controller';
import { Task } from '@task/task/task';
import { Service } from '@task/model/service/service';
import { TaskType } from '@task/model/service/task-type';
import { Status } from '@task/model/status/status';
import { Priority } from '@task/model/priority/priority';
import { TaskHistoryEvent } from '@task/model/task-history-event/task-history-event';
import { UserModule } from '@user/user.module';

@Module({
  controllers: [
    TaskController,
    ServiceController,
    TaskTypeController,
    StatusController,
    PriorityController,
  ],
  providers: [TaskService],
  imports: [
    TypeOrmModule.forFeature([
      Task,
      Service,
      TaskType,
      Status,
      Priority,
      TaskHistoryEvent,
    ]),
    UserModule,
  ],
  exports: [TaskService],
})
export class TaskModule {}
