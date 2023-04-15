import {
  Body,
  Controller,
  ForbiddenException,
  HttpStatus,
  Post,
  Put,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthInterceptor } from '@auth/auth.interceptor';
import { MemberType } from '@user/model/member.type';
import { CreateUserDTO } from '@shared/dto/create-user.dto';
import { ChangeUserPasswordDTO } from '@shared/dto/change-user-password.dto';

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
}

@ApiTags('AuthorizationController')
@ApiBearerAuth()
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @Post('/login')
  private login(@Body() dto: CreateUserDTO): Promise<{ token: string }> {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Registration of new employee' })
  @Post('/signup/employee')
  signUpEmployee(@Body() dto: CreateUserDTO): Promise<{ token: string }> {
    return this.authService.signUp(dto, MemberType.EMPLOYEE);
  }

  @ApiOperation({ summary: 'Registration of new client' })
  @Post('/signup/client')
  signUpClient(@Body() dto: CreateUserDTO): Promise<{ token: string }> {
    return this.authService.signUp(dto, MemberType.CLIENT);
  }

  @ApiOperation({ summary: 'Change user password' })
  @ApiResponse({ status: HttpStatus.OK })
  @Put('/change-password')
  private changePassword(@Body() dto: ChangeUserPasswordDTO): Promise<boolean> {
    return this.authService.changePassword(dto);
  }

  // @Post('refresh-token')
  // async getTokens(@Req() req): Promise<LoginResponse> {
  //   const token = req.cookies['refreshToken'];
  //
  //   try {
  //     const { accessToken, refreshToken, user } =
  //       await this.authService.refreshTokens(token);
  //     if (accessToken && user) {
  //       return { accessToken, refreshToken };
  //     }
  //   } catch (error) {
  //     throw new ForbiddenException(error.message);
  //   }
  // }
}
