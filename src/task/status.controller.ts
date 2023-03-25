import { Controller, Get, HttpStatus } from '@nestjs/common';
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
}
