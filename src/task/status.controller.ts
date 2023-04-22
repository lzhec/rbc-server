import { Body, Controller, Get, HttpStatus, Post, Put } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { TaskService } from '@task/task.service';
import { Status } from '@task/model/status/status';

@ApiTags('TaskController')
@ApiBearerAuth()
@Controller('/api/task/status')
export class StatusController {
  constructor(private taskService: TaskService) {}

  @ApiOperation({ summary: 'Get all statuses' })
  @ApiResponse({ status: HttpStatus.OK, type: [Status] })
  @Get()
  private getAll(): Promise<Status[]> {
    return this.taskService.getAllStatuses();
  }

  @ApiOperation({ summary: 'Create new status' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Status })
  @Post()
  private create(@Body() dto: Status): Promise<Status> {
    return this.taskService.createStatus(dto);
  }

  @ApiOperation({ summary: 'Update status' })
  @ApiResponse({ status: HttpStatus.OK, type: Status })
  @Put()
  private update(@Body() dto: Status): Promise<Status> {
    return this.taskService.updateStatus(dto);
  }
}
