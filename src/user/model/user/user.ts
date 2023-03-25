import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  JoinTable,
  ManyToMany,
  TableInheritance,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Member } from '../member';
import { Group } from '../group/group';
import { Contact } from '../contact/contact';
import { Role } from '@role/model/role';
import { ContactTypeEnum } from '@user/model/contact/contact-type.enum';

export class CreateUserDTO implements Pick<User, 'contacts' | 'password'> {
  @ApiProperty({ type: [Contact] })
  contacts: Contact[];

  @ApiProperty()
  password: string;
}

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class User extends Member {
  @ApiProperty()
  @Column('varchar', { name: 'first_name', nullable: true })
  private firstName: string;

  @ApiProperty()
  @Column('varchar', { name: 'middle_name', nullable: true })
  private middleName: string;

  @ApiProperty()
  @Column('varchar', { name: 'last_name', nullable: true })
  private lastName: string;

  @Exclude()
  @Column('varchar', { unique: true, nullable: false })
  private login: string;

  @Exclude()
  @Column('varchar', { nullable: false })
  public password: string;

  @ManyToMany(() => Group, (group) => group.users)
  @JoinTable({
    name: 'user_user_group',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_user_group_user_id',
    },
    inverseJoinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_user_group_group_id',
    },
  })
  public groups: Group[];

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_user_role',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_user_role_user_id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_user_role_role_id',
    },
  })
  private roles: Role[];

  @ApiProperty({ type: [Contact] })
  @OneToMany(() => Contact, (contact) => contact.user, {
    cascade: true,
  })
  public contacts: Contact[];

  /**
   * Getters & Setters
   */

  public setFirstName(value: string) {
    this.firstName = value;
  }

  public get getFirstName(): string {
    return this.firstName;
  }

  public setMiddleName(value: string) {
    this.middleName = value;
  }

  public get getMiddleName(): string {
    return this.middleName;
  }

  public setLastName(value: string) {
    this.lastName = value;
  }

  public get getLastName(): string {
    return this.lastName;
  }

  public setLogin(value: string) {
    this.login = value;
  }

  public get getLogin(): string {
    return this.login;
  }

  public setPassword(value: string) {
    this.password = value;
  }

  public get getPassword(): string {
    return this.password;
  }

  public setGroups(value: Group[]) {
    this.groups = value;
  }

  public get getGroups(): Group[] {
    return this.groups;
  }

  public setRoles(value: Role[]) {
    this.roles = value;
  }

  public get getRoles(): Role[] {
    return this.roles;
  }

  public setContacts(value: Contact[]) {
    this.contacts = value;
  }

  public get getContacts(): Contact[] {
    return this.contacts;
  }

  constructor(id?: string) {
    super(id);
  }

  public equals(object: Object): boolean {
    if (this === object) {
      return true;
    }

    if (!object || object instanceof User) {
      return false;
    }

    return this.getId === (object as User).getId;
  }

  public getContactByType(type: ContactTypeEnum): Contact[] {
    const result: Contact[] = [];

    if (this.contacts) {
      this.contacts.forEach((contact) => {
        if (contact.getType === type) {
          result.push(contact);
        }
      });
    }

    return result;
  }
}
