import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

import { TaskService } from '@task/task.service';
import { Task } from '@task/task/task';

@ApiTags('TaskController')
@ApiBearerAuth()
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
  private create(@Body() task: Task, @Req() req: Request): Promise<Task> {
    return this.taskService.createTask(task, req);
  }

  @ApiOperation({ summary: 'Update task' })
  @ApiResponse({ status: HttpStatus.OK, type: Task })
  @Put()
  private update(@Body() task: Task): Promise<Task> {
    return this.taskService.updateTask(task);
  }

  @ApiOperation({ summary: 'Get task' })
  @ApiResponse({ status: HttpStatus.OK, type: Task })
  @Get('/:id')
  private getOne(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }
}
