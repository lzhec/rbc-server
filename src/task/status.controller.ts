import { Body, Controller, Get, HttpStatus, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { TaskService } from '@task/task.service';
import { Status } from '@task/model/status/status';

@ApiTags('StatusController')
@Controller('/api/status')
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
  private create(@Body() status: Status): Promise<Status> {
    return this.taskService.createStatus(status);
  }

  @ApiOperation({ summary: 'Update status' })
  @ApiResponse({ status: HttpStatus.OK, type: Status })
  @Put()
  private update(@Body() status: Status): Promise<Status> {
    return this.taskService.updateStatus(status);
  }
}
