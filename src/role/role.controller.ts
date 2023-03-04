import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { RoleService } from './role.service';
import { CreateRoleDTO, Role } from './model/role';

@Controller('api/roles')
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
