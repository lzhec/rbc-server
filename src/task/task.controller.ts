import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { TaskService } from '@task/task.service';
import { Task } from '@task/task/task';

@ApiTags('TaskController')
@Controller('/api/task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: HttpStatus.OK, type: [Task] })
  @Get()
  private getAll(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }
}
