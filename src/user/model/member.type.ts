import { ApiProperty, ApiTags } from "@nestjs/swagger";

export enum MemberTypeEnum {
  EMPLOYEE,
  CLIENT,
  EMPLOYEE_GROUP,
  CLIENT_COMPANY,
}

@ApiTags()
export class MemberType {
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: number;

  @ApiProperty()
  paramName: string;

  @ApiProperty()
  entityClass: string;

  constructor(
    name: string,
    type: number,
    paramName: string,
    entityClass: string,
  ) {
    this.name = name;
    this.type = type;
    this.paramName = paramName;
    this.entityClass = entityClass;
  }

  public static EMPLOYEE: MemberType = new MemberType(
    'Employee',
    0,
    'employee',
    '',
  );
  public static CLIENT: MemberType = new MemberType('Client', 1, 'client', '');
  public static EMPLOYEE_GROUP: MemberType = new MemberType(
    'Employee group',
    2,
    'employeeGroup',
    '',
  );
  public static CLIENT_COMPANY: MemberType = new MemberType(
    'Client company',
    3,
    'clientCompany',
    '',
  );
}
