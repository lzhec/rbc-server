import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoleService } from '@role/role.service';
import { CreateUserDTO, User } from './model/user/user';
import { Employee } from './model/user/employee';
import { Client } from './model/user/client';
import { DefaultRoleEnum } from '@role/model/role';
import { MemberType } from './model/member.type';
import { ContactTypeEnum } from './model/contact/contact-type.enum';
import { Contact } from './model/contact/contact';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(User)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    private roleService: RoleService,
  ) {}

  public async createEmployee(dto: CreateUserDTO): Promise<Employee> {
    const newEmployee = this.employeeRepository.create(dto);
    const defaultRole = await this.roleService.getRoleByName(
      DefaultRoleEnum.USER,
    );

    newEmployee.setRoles([defaultRole]);
    newEmployee.setLogin(
      newEmployee.getContacts.find((p) => p.getType === ContactTypeEnum.EMAIL)
        .getValue,
    );
    newEmployee.setMemberType(MemberType.EMPLOYEE);

    return this.employeeRepository.save(newEmployee);
  }

  public async createClient(dto: CreateUserDTO): Promise<Client> {
    const newClient = this.clientRepository.create(dto);
    const defaultRole = await this.roleService.getRoleByName(
      DefaultRoleEnum.USER,
    );

    newClient.setRoles([defaultRole]);
    newClient.setLogin(
      newClient.getContacts.find((p) => p.getType === ContactTypeEnum.EMAIL)
        .getValue,
    );
    newClient.setMemberType(MemberType.CLIENT);

    return this.clientRepository.save(newClient);
  }

  public async updateEmployee(dto: Employee): Promise<Employee> {
    const res = await this.employeeRepository.save(Employee.fromObject(dto));
    console.log(res);

    return res;
  }

  public async updateClient(dto: Client): Promise<Client> {
    return await this.clientRepository.save(Client.fromObject(dto));
  }

  public async getAllEmployees(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  public async getAllClients(): Promise<Client[]> {
    return await this.clientRepository.find();
  }

  public async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async getUsersByContact(
    contact: Contact,
    withException = true,
  ): Promise<User> {
    const c = await this.contactRepository.findOneBy({
      value: contact.getValue,
      type: contact.getType,
    });

    if (!c) {
      if (withException) {
        throw new HttpException(
          `User with this ${contact.getType} doesn't exist`,
          HttpStatus.NOT_FOUND,
        );
      } else {
        return null;
      }
    }

    return this.userRepository.findOneBy({ id: c.getId });
  }
}
