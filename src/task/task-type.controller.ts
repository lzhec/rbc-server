import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { TaskService } from '@task/task.service';
import { TaskType } from '@task/model/service/task-type';

@ApiTags('ServiceController')
@Controller('/api/service/task-type')
export class TaskTypeController {
  constructor(private taskService: TaskService) {}

  @ApiOperation({ summary: 'Get all task types' })
  @ApiResponse({ status: HttpStatus.OK, type: [TaskType] })
  @Get()
  private getAll(): Promise<TaskType[]> {
    return this.taskService.getAllTaskTypes();
  }

  @ApiOperation({ summary: 'Create new task type' })
  @ApiResponse({ status: HttpStatus.CREATED, type: TaskType })
  @Post()
  private create(@Body() taskType: TaskType): Promise<TaskType> {
    return this.taskService.createTaskType(taskType);
  }
}
