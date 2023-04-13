import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UserService } from '@user/user.service';
import { User } from '@user/model/user/user';
import { MemberType, MemberTypeEnum } from '@user/model/member.type';
import { CreateUserDTO } from '@shared/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async login(dto: CreateUserDTO): Promise<{ token: string }> {
    const user = await this.validateUser(dto);

    return this.generateToken(user);
  }

  public async signUp(
    dto: CreateUserDTO,
    memberType: MemberType,
  ): Promise<{ token: string }> {
    const candidate = await this.userService
      .getUsersByContacts(dto.contacts)
      .catch(() => null);

    if (candidate) {
      throw new HttpException(
        `User with this contacts already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    let newUser: User;

    switch (memberType.type) {
      case MemberTypeEnum.EMPLOYEE:
        newUser = await this.userService.createEmployee({
          ...dto,
          password: hashPassword,
        });
        break;

      case MemberTypeEnum.CLIENT:
        newUser = await this.userService.createClient({
          ...dto,
          password: hashPassword,
        });
        break;
    }

    return this.generateToken(newUser);
  }

  private async generateToken(user: User): Promise<{ token: string }> {
    const payload = {
      contacts: user.contacts,
      id: user.getId,
      roles: user.getRoles,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(dto: CreateUserDTO): Promise<User> {
    const user = await this.userService.getUsersByContact(dto.contacts[0]);
    const passwordEquals = await bcrypt.compare(dto.password, user.password);

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Username or password is incorrect',
    });
  }
}
