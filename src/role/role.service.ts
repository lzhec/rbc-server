import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRoleDTO, Role } from './model/role';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private repository: Repository<Role>) {}

  public async createRole(dto: CreateRoleDTO): Promise<Role> {
    return this.repository.save(dto);
  }

  public async getRoleByName(roleName: string): Promise<Role> {
    return this.repository.findOneBy({ name: roleName });
  }
}
