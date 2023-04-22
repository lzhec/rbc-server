import { Body, Controller, Get, HttpStatus, Post, Put } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { Client } from './model/user/client';
import { CreateUserDTO } from '@shared/dto/create-user.dto';

@ApiTags('UserController')
@ApiBearerAuth()
@Controller('/api/user/client')
export class ClientController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Create new client' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Client })
  @Post()
  private create(@Body() userDto: CreateUserDTO): Promise<Client> {
    return this.userService.createClient(userDto);
  }

  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({ status: HttpStatus.OK, type: [Client] })
  @Get()
  private getAll(): Promise<Client[]> {
    return this.userService.getAllClients();
  }

  @ApiOperation({ summary: 'Update client' })
  @ApiResponse({ status: HttpStatus.OK, type: Client })
  @Put()
  private updateEmployee(@Body() userDto: Client): Promise<Client> {
    return this.userService.updateClient(userDto);
  }
}
