import { ChildEntity } from 'typeorm';

import { Group } from './group';
import { MemberType } from '../member.type';

@ChildEntity()
export class ClientCompany extends Group {
  constructor(id: string, name: string) {
    super(id);
    this.setName(name);
    this.setMemberType(MemberType.CLIENT_COMPANY);
  }

  public getEntityMemberType(): MemberType {
    return MemberType.EMPLOYEE_GROUP;
  }

  public bindUser(userId): void {
    const users = this.getUsers;
    const user = users.find((user) => user.getId === userId);

    users.push(user);
  }

  public unbindUser(userId) {
    const users = this.getUsers;
    const index = users.findIndex((user) => user.getId === userId);

    if (index > -1) {
      users.splice(index, 1);
    }
  }
}
