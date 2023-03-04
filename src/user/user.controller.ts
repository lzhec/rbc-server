import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { User } from './model/user/user';

@ApiTags('UserController')
@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @Get()
  private getAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}
