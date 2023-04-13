import { ApiProperty } from '@nestjs/swagger';

import { Contact } from '@user/model/contact/contact';
import { User } from '@user/model/user/user';

export class CreateUserDTO implements Pick<User, 'contacts' | 'password'> {
  @ApiProperty({ type: [Contact] })
  contacts: Contact[];

  @ApiProperty()
  password: string;
}
