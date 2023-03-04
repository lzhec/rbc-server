import { ChildEntity } from 'typeorm';

import { User } from './user';
import { MemberType } from '../member.type';

@ChildEntity()
export class Client extends User {
  constructor(
    id?: string,
    firstName?: string,
    middleName?: string,
    lastName?: string,
  ) {
    super(id);
    this.setFirstName(firstName);
    this.setMiddleName(middleName);
    this.setLastName(lastName);
    this.setMemberType(MemberType.CLIENT);
  }

  public static fromObject(obj: Client): Client {
    const client = new Client();

    return Object.assign(client, obj);
  }
}
