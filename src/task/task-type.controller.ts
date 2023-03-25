import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { TaskService } from '@task/task.service';
import { TaskType } from '@task/model/service/task-type';

@ApiTags('TaskTypeController')
@Controller('/api/task-type')
export class TaskTypeController {
  constructor(private taskService: TaskService) {}

  @ApiOperation({ summary: 'Get all task types' })
  @ApiResponse({ status: HttpStatus.OK, type: [TaskType] })
  @Get()
  private getAll(): Promise<TaskType[]> {
    return this.taskService.getAllTaskTypes();
  }
}
