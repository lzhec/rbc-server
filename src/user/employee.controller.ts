import { Body, Controller, Get, HttpStatus, Post, Put } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { Employee } from './model/user/employee';
import { CreateUserDTO } from '@shared/dto/create-user.dto';

@ApiTags('UserController')
@ApiBearerAuth()
@Controller('/api/user/employee')
export class EmployeeController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Create new employee' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Employee })
  @Post()
  private create(@Body() userDto: CreateUserDTO): Promise<Employee> {
    return this.userService.createEmployee(userDto);
  }

  @ApiOperation({ summary: 'Get all employees' })
  @ApiResponse({ status: HttpStatus.OK, type: [Employee] })
  @Get()
  private getAll(): Promise<Employee[]> {
    return this.userService.getAllEmployees();
  }

  @ApiOperation({ summary: 'Update employee' })
  @ApiResponse({ status: HttpStatus.OK, type: Employee })
  @Put()
  private updateEmployee(@Body() userDto: Employee): Promise<Employee> {
    return this.userService.updateEmployee(userDto);
  }
}
