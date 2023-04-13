import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { MemberType } from '@user/model/member.type';
import { CreateUserDTO } from '@shared/dto/create-user.dto';

@ApiTags('AuthorizationController')
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

  @Post('/signup/client')
  signUpClient(@Body() dto: CreateUserDTO): Promise<{ token: string }> {
    return this.authService.signUp(dto, MemberType.CLIENT);
  }
}
