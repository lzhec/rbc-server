import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoleService } from '@role/role.service';
import { User } from './model/user/user';
import { Employee } from './model/user/employee';
import { Client } from './model/user/client';
import { DefaultRoleEnum } from '@role/model/role';
import { MemberType } from './model/member.type';
import { ContactTypeEnum } from './model/contact/contact-type.enum';
import { Contact } from './model/contact/contact';
import { CreateUserDTO } from '@shared/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    private roleService: RoleService,
  ) {}

  public async createEmployee(dto: CreateUserDTO): Promise<Employee> {
    const newEmployee = await this.employeeRepository.create(dto);
    const defaultRole = await this.roleService.getRoleByName(
      DefaultRoleEnum.USER,
    );

    newEmployee.setRoles([defaultRole]);
    newEmployee.setLogin(
      newEmployee.getContacts.find((p) => p.getType === ContactTypeEnum.EMAIL)
        .getValue,
    );
    newEmployee.setMemberType(MemberType.EMPLOYEE);

    return await this.employeeRepository.save(newEmployee);
    // const newContact = await this.contactRepository.findOneBy({
    //   id: result.contacts[0].getId,
    // });

    // newContact.user = result;
    // await this.contactRepository.save(newContact);
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
    // const employee = await this.userRepository.findOne({
    //   where: { id: dto.id },
    //   relations: {
    //     contacts: true,
    //   },
    // });
    //
    // if (!employee) {
    //   throw new NotFoundException(`Entity with id ${dto.id} not found`);
    // }
    //
    // const res = await this.employeeRepository
    //   .createQueryBuilder()
    //   .update(Employee)
    //   .set(dto)
    //   .relation(Employee, 'contacts')
    //   .of(employee)
    //   .update(Contact)
    //   .execute();
    //
    // const res = this.employeeRepository.findOneBy({ id: dto.id });

    return await this.employeeRepository.save(Employee.fromObject(dto));
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

  public async getUsersByContacts(contacts: Contact[]): Promise<User> {
    const options = [];

    contacts.forEach((contact) => {
      if (contact.type === 'email' || contact.type === 'phone') {
        options.push({ value: contact.value, type: contact.type });
      }

      if (options.length > 1) {
        return;
      }
    });

    const contact = await this.contactRepository.findOne({
      where: options,
      relations: ['user'],
    });

    if (!contact) {
      throw new HttpException(
        `User with this contacts doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return contact.getUser;
  }
}
