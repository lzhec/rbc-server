import { Body, Controller, Get, HttpStatus, Post, Put } from '@nestjs/common';
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

  @ApiOperation({ summary: 'Create new task' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Task })
  @Post()
  private create(@Body() task: Task): Promise<Task> {
    return this.taskService.createTask(task);
  }

  @ApiOperation({ summary: 'Update task' })
  @ApiResponse({ status: HttpStatus.OK, type: Task })
  @Put()
  private update(@Body() task: Task): Promise<Task> {
    return this.taskService.updateTask(task);
  }
}
