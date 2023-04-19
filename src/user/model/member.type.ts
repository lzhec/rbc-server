import { ApiProperty, ApiTags } from '@nestjs/swagger';

export enum MemberTypeEnum {
  SERVICE,
  EMPLOYEE,
  CLIENT,
  EMPLOYEE_GROUP,
  CLIENT_COMPANY,
}

@ApiTags()
export class MemberType {
  @ApiProperty()
  name: keyof typeof MemberTypeEnum | string;

  @ApiProperty()
  type: MemberTypeEnum;

  constructor(
    name: keyof typeof MemberTypeEnum | string,
    type: MemberTypeEnum,
  ) {
    this.name = name;
    this.type = type;
  }

  public static SERVICE = new MemberType('', MemberTypeEnum.SERVICE);
  public static EMPLOYEE = new MemberType('EMPLOYEE', MemberTypeEnum.EMPLOYEE);
  public static CLIENT = new MemberType('CLIENT', MemberTypeEnum.CLIENT);
  public static EMPLOYEE_GROUP = new MemberType(
    'EMPLOYEE_GROUP',
    MemberTypeEnum.EMPLOYEE_GROUP,
  );
  public static CLIENT_COMPANY = new MemberType(
    'CLIENT_COMPANY',
    MemberTypeEnum.CLIENT_COMPANY,
  );
}
