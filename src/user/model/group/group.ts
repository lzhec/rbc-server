import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  TableInheritance,
} from 'typeorm';
import { hash } from 'object-hash';

import { Member } from '../member';
import { User } from '../user/user';
import { MemberType } from '../member.type';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user_group')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class Group extends Member {
  @ApiProperty()
  @Column('varchar', { nullable: false })
  private name: string;

  @ApiProperty()
  @Column('text')
  private description: string;

  @ApiProperty()
  @ManyToMany(() => User, (user) => user.getGroups)
  @JoinTable({
    name: 'users_user_groups',
    joinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_user_group_group_id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_user_group_user_id',
    },
  })
  private users: User[];

  /**
   * Getters & Setters
   */

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

  constructor(id: string) {
    super(id);
  }

  public abstract bindUser(userId: string): void;

  public abstract unbindUser(userId: string): void;

  public abstract getEntityMemberType(): MemberType;

  public equals(object: Object): boolean {
    if (this === object) {
      return true;
    }

    if (!(object instanceof Group)) {
      return false;
    }

    return Object.is(this.getId, object.getId);
  }

  public hashCode(): number {
    return hash(this.getId, this.name);
  }

  public getAttributesForShortEntity(): { [prop: string]: any } {
    return { id: this.getId, name: this.name };
  }
}
