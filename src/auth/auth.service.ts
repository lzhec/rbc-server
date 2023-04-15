import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { UserService } from '@user/user.service';
import { User } from '@user/model/user/user';
import { MemberType, MemberTypeEnum } from '@user/model/member.type';
import { CreateUserDTO } from '@shared/dto/create-user.dto';
import { ChangeUserPasswordDTO } from '@shared/dto/change-user-password.dto';
import { Employee } from '@user/model/user/employee';
import { Client } from '@user/model/user/client';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  public async login(dto: CreateUserDTO): Promise<{ token: string }> {
    const user = await this.userService.getUserByContact(dto.contacts[0]);

    await this.validateUser(dto.password, user.password);

    return this.generateToken(user);
  }

  public async signUp(
    dto: CreateUserDTO,
    memberType: MemberType,
  ): Promise<{ token: string }> {
    const candidate = await this.userService
      .getUserByContacts(dto.contacts)
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

  public async changePassword(dto: ChangeUserPasswordDTO): Promise<boolean> {
    const user = await this.userService.getUserById(dto.id);

    await this.validateUser(dto.password, user.password);

    const hashPassword = await bcrypt.hash(dto.newPassword, 5);
    let newUser: User;

    switch (user.memberType.type) {
      case MemberTypeEnum.EMPLOYEE:
        newUser = await this.userService.updateEmployee({
          ...user,
          password: hashPassword,
        } as Employee);
        break;

      case MemberTypeEnum.CLIENT:
        newUser = await this.userService.updateClient({
          ...user,
          password: hashPassword,
        } as Client);
        break;
    }

    return true;
  }

  private async generateToken(user: User): Promise<{ token: string }> {
    const payload = {
      contacts: user.contacts,
      id: user.getId,
      roles: user.getRoles,
    };

    return {
      token: sign(payload, process.env.PRIVATE_KEY),
    };
  }

  // async refreshTokens(refreshToken: string) {
  //   const decodedRefreshToken = verify(
  //     refreshToken,
  //     process.env.REFRESH_TOKEN_SECRET,
  //   );
  //   const user = await this.userService.getUserById(decodedRefreshToken.id);
  //
  //   // If user is not found or the refresh token version doesn't match, throw error
  //   if (!user || user.tok !== decodedRefreshToken.tokenVersion) {
  //     throw new Error('Please register or sign in.');
  //   }
  //
  //   const { id, role, tokenVersion } = user;
  //
  //   const tokens = await this.assignTokens(id, role, tokenVersion);
  //   return {
  //     user,
  //     ...tokens,
  //   };
  // }

  private async validateUser(dtoPassword, userPassword): Promise<boolean> {
    if (await bcrypt.compare(dtoPassword, userPassword)) {
      return true;
    }

    throw new UnauthorizedException({
      message: 'Username or password is incorrect',
    });
  }
}
