import { Column, ChildEntity } from 'typeorm';

import { User } from './user';
import { MemberType } from '../member.type';

@ChildEntity()
export class Employee extends User {
  @Column('integer', { name: 'tab_number' })
  public tabNumber: number;

  /**
   * Getters & Setters
   */

  public setTabNumber(value: number) {
    this.tabNumber = value;
  }

  public get getTabNumber(): number {
    return this.tabNumber;
  }

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
    this.setMemberType(MemberType.EMPLOYEE);
  }

  public static fromObject(obj: Employee): Employee {
    const employee = new Employee();

    Object.assign(employee, obj);

    return employee;
  }
}
