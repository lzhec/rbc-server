import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { ContactTypeEnum } from './contact-type.enum';
import { User } from '@user/model/user/user';
import { Group } from '@user/model/group/group';

@Entity()
export class Contact {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  private readonly id: string;

  @ApiProperty()
  @Column('varchar', { nullable: false })
  public value: string;

  @ApiProperty({ enum: ContactTypeEnum })
  @Column('enum', {
    name: 'type',
    nullable: false,
    enum: ContactTypeEnum,
  })
  public type: ContactTypeEnum;

  @ManyToOne(() => User, (user) => user.contacts)
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @ManyToOne(() => Group, (group) => group.contacts)
  @JoinColumn({ name: 'group_id' })
  public group: Group;

  /**
   * Getters & Setters
   */

  public get getId(): string {
    return this.id;
  }

  public setValue(value) {
    this.value = value;
  }

  public get getValue(): string {
    return this.value;
  }

  public setType(value) {
    this.type = value;
  }

  public get getType(): ContactTypeEnum {
    return this.type;
  }

  public setUser(value) {
    this.user = value;
  }

  public get getUser(): User {
    return this.user;
  }

  public setGroup(value) {
    this.group = value;
  }

  public get getGroup(): Group {
    return this.group;
  }

  constructor(type?: ContactTypeEnum, value?: string) {
    this.type = type;
    this.value = value;
  }
}
