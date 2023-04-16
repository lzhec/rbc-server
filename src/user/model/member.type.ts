import { ApiProperty, ApiTags } from '@nestjs/swagger';

export enum MemberTypeEnum {
  EMPLOYEE,
  CLIENT,
  EMPLOYEE_GROUP,
  CLIENT_COMPANY,
}

@ApiTags()
export class MemberType<T = any> {
  @ApiProperty()
  name: keyof typeof MemberTypeEnum;

  @ApiProperty()
  type: MemberTypeEnum;

  @ApiProperty()
  paramName: string;

  @ApiProperty()
  entityClass: T;

  constructor(
    name: keyof typeof MemberTypeEnum,
    type: MemberTypeEnum,
    entityClass: T,
  ) {
    this.name = name;
    this.type = type;
    this.entityClass = entityClass;
  }

  public static EMPLOYEE = new MemberType('EMPLOYEE', 0, 'Employee');
  public static CLIENT = new MemberType('CLIENT', 1, 'Client');
  public static EMPLOYEE_GROUP = new MemberType(
    'EMPLOYEE_GROUP',
    2,
    'EmployeeGroup',
  );
  public static CLIENT_COMPANY = new MemberType(
    'CLIENT_COMPANY',
    3,
    'ClientCompany',
  );
}
