import { Body, Controller, Get, HttpStatus, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { TaskService } from '@task/task.service';
import { Priority } from '@task/model/priority/priority';

@ApiTags('PriorityController')
@Controller('/api/priority')
export class PriorityController {
  constructor(private taskService: TaskService) {}

  @ApiOperation({ summary: 'Get all priorities' })
  @ApiResponse({ status: HttpStatus.OK, type: [Priority] })
  @Get()
  private getAll(): Promise<Priority[]> {
    return this.taskService.getAllPriorities();
  }

  @ApiOperation({ summary: 'Create new priority' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Priority })
  @Post()
  private create(@Body() priority: Priority): Promise<Priority> {
    return this.taskService.createPriority(priority);
  }

  @ApiOperation({ summary: 'Update priority' })
  @ApiResponse({ status: HttpStatus.OK, type: Priority })
  @Put()
  private update(@Body() priority: Priority): Promise<Priority> {
    return this.taskService.updatePriority(priority);
  }
}
