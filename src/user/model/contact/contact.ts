import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { ContactTypeEnum } from './contact-type.enum';
import { Member } from '../member';

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

  @ManyToOne(() => Member, (member) => member.contacts)
  @JoinColumn({ name: 'member_id' })
  public member: Member;

  /**
   * Getters & Setters
   */

  public get getId(): string {
    return this.id;
  }

  public set setValue(value) {
    this.value = value;
  }

  public get getValue(): string {
    return this.value;
  }

  public set setType(value) {
    this.type = value;
  }

  public get getType(): ContactTypeEnum {
    return this.type;
  }

  public set setMember(value) {
    this.member = value;
  }

  public get getMember(): Member {
    return this.member;
  }

  constructor(type: ContactTypeEnum, value: string) {
    this.type = type;
    this.value = value;
  }
}
