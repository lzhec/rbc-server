import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { MemberType } from './member.type';

@Entity()
export abstract class Member {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @ApiProperty({ default: false })
  @Column('boolean', { default: false })
  private archived: boolean;

  @ApiProperty({ type: MemberType })
  @Column('jsonb', {
    name: 'member_type',
    nullable: false,
    default: {},
  })
  public memberType: MemberType;

  /**
   * Getters & Setters
   */

  public get getId(): string {
    return this.id;
  }

  public setArchived(value: boolean) {
    this.archived = value;
  }

  public get getArchived(): boolean {
    return this.archived;
  }

  public setMemberType(value: MemberType) {
    this.memberType = value;
  }

  public get getMemberType(): MemberType {
    return this.memberType;
  }

  constructor(id?: string) {
    if (id) {
      this.id = id;
    }
  }

  public equals(object: Object): boolean {
    if (this === object) {
      return true;
    }

    if (!object || object instanceof Member) {
      return false;
    }

    return this.getId === (object as Member).getId;
  }
}
