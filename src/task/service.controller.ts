import { Body, Controller, Get, HttpStatus, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { TaskService } from '@task/task.service';
import { Service } from '@task/model/service/service';

@ApiTags('ServiceController')
@Controller('/api/service')
export class ServiceController {
  constructor(private taskService: TaskService) {}

  @ApiOperation({ summary: 'Get all services' })
  @ApiResponse({ status: HttpStatus.OK, type: [Service] })
  @Get()
  private getAll(): Promise<Service[]> {
    return this.taskService.getAllServices();
  }

  @ApiOperation({ summary: 'Create new service' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Service })
  @Post()
  private create(@Body() service: Service): Promise<Service> {
    return this.taskService.createService(service);
  }

  @ApiOperation({ summary: 'Update service' })
  @ApiResponse({ status: HttpStatus.OK, type: Service })
  @Put()
  private update(@Body() service: Service): Promise<Service> {
    return this.taskService.updateService(service);
  }
}
