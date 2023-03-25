import { Controller, Get, HttpStatus } from '@nestjs/common';
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
}
