import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';

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

  public async createTask(dto: Task, req: Request): Promise<Task> {
    return null;
  }

  public async createPriority(dto: Priority): Promise<Priority> {
    const newPriority = this.priorityRepository.create(dto);

    return this.priorityRepository.save(newPriority);
  }

  public async createStatus(dto: Status): Promise<Status> {
    const newStatus = this.statusRepository.create(dto);

    return this.statusRepository.save(newStatus);
  }

  public async createService(dto: Service): Promise<Service> {
    const newService = this.serviceRepository.create(dto);

    return this.serviceRepository.save(newService);
  }

  public async updateTask(dto: Task): Promise<Task> {
    return null;
  }

  public async updatePriority(dto: Priority): Promise<Priority> {
    return await this.priorityRepository.save(Priority.fromObject(dto));
  }

  public async updateStatus(dto: Status): Promise<Status> {
    return await this.statusRepository.save(Status.fromObject(dto));
  }

  public async updateService(dto: Service): Promise<Service> {
    return await this.serviceRepository.save(Service.fromObject(dto));
  }
}
