import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { RoleService } from './role.service';
import { CreateRoleDTO, Role } from './model/role';

@ApiTags('UserController')
@ApiBearerAuth()
@Controller('api/user/role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  private create(@Body() dto: CreateRoleDTO): Promise<Role> {
    return this.roleService.createRole(dto);
  }

  @Get('/:name')
  private getByName(@Param('name') name: string): Promise<Role> {
    return this.roleService.getRoleByName(name);
  }
}
