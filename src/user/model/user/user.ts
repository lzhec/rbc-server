import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  JoinTable,
  ManyToMany,
  TableInheritance,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Member } from '../member';
import { Group } from '../group/group';
import { Contact } from '../contact/contact';
import { Role } from '@role/model/role';

export class CreateUserDTO implements Pick<User, 'contacts' | 'password'> {
  @ApiProperty({ type: [Contact] })
  contacts: Contact[];

  @ApiProperty()
  password: string;
}

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class User extends Member {
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

  @ManyToMany(() => Group, (group) => group.getUsers)
  @JoinTable({
    name: 'users_user_groups',
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
  private groups: Group[];

  @ManyToMany(() => Role, (role) => role.getUsers)
  @JoinTable({
    name: 'users_user_roles',
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

  // constructor(id: string) {
  //   super(id);
  // }

  public equals(object: Object): boolean {
    if (this === object) {
      return true;
    }

    if (!object || object instanceof User) {
      return false;
    }

    return this.getId === (object as User).getId;
  }
}
