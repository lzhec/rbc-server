import { Controller, Get, HttpStatus } from '@nestjs/common';
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
}
