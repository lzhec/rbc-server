import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { MemberType } from './member.type';
import { Contact } from './contact/contact';
import { ContactTypeEnum } from './contact/contact-type.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export abstract class Member {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @ApiProperty({ default: false })
  @Column('boolean', { default: false })
  private archived: boolean;

  @ApiProperty({ type: MemberType })
  @Column('text', {
    name: 'member_type',
    nullable: false,
  })
  private memberType: MemberType;

  @ApiProperty({ type: [Contact] })
  @OneToMany('Contact', (contact: Contact) => contact.getMember, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  public contacts: Contact[];

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

  public setContacts(value: Contact[]) {
    this.contacts = value;
  }

  public get getContacts(): Contact[] {
    return this.contacts;
  }

  constructor(id: string) {
    this.id = id;
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
