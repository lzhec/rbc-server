import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from '@task/task/task';
import { Service } from '@task/model/service/service';
import { TaskType } from '@task/model/service/task-type';
import { Status } from '@task/model/status/status';
import { Priority } from '@task/model/priority/priority';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    @InjectRepository(TaskType)
    private taskTypeRepository: Repository<TaskType>,
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
    @InjectRepository(Priority)
    private priorityRepository: Repository<Priority>,
  ) {}

  public async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  public async getAllServices(): Promise<Service[]> {
    return await this.serviceRepository.find();
  }

  public async getAllTaskTypes(): Promise<TaskType[]> {
    return await this.taskTypeRepository.find();
  }

  public async getAllStatuses(): Promise<Status[]> {
    return await this.statusRepository.find();
  }

  public async getAllPriorities(): Promise<Priority[]> {
    return await this.priorityRepository.find();
  }
}
