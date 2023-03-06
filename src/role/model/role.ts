import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { User } from '@user/model/user/user';

export enum DefaultRoleEnum {
  USER = 'USER',
}

export class CreateRoleDTO implements Pick<Role, 'name' | 'description'> {
  @ApiProperty()
  public readonly name: string;

  @ApiProperty()
  public readonly description: string;
}

@Entity()
export class Role {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  private readonly id: string;

  @ApiProperty()
  @Column('varchar', { nullable: false })
  public name: string;

  @ApiProperty()
  @Column('text')
  public description: string;

  @ApiProperty()
  @ManyToMany(() => User, (user) => user.getRoles)
  @JoinTable({
    name: 'users_user_roles',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_user_role_role_id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_user_role_user_id',
    },
  })
  public users: User[];

  /**
   * Getters & Setters
   */

  public get getId(): string {
    return this.id;
  }

  public setName(value: string) {
    this.name = value;
  }

  public get getName(): string {
    return this.name;
  }

  public setDescription(value: string) {
    this.description = value;
  }

  public get getDescription(): string {
    return this.description;
  }

  public setUsers(value: User[]) {
    this.users = value;
  }

  public get getUsers(): User[] {
    return this.users;
  }

  constructor(id: string, name: string, description?: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
