import { ApiProperty } from '@nestjs/swagger';

import { User } from '@user/model/user/user';

export class ChangeUserPasswordDTO implements Pick<User, 'id' | 'password'> {
  @ApiProperty()
  id: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  newPassword: string;
}
