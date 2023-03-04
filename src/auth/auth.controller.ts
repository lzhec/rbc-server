import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { CreateUserDTO } from "../user/model/user/user";
import { MemberType } from "../user/model/member.type";

@ApiTags('AuthorizationController')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  private login(@Body() dto: CreateUserDTO): Promise<{ token: string }> {
    return this.authService.login(dto);
  }

  @Post('/employee/signup')
  signUpEmployee(@Body() dto: CreateUserDTO): Promise<{ token: string }> {
    return this.authService.signUp(dto, MemberType.EMPLOYEE);
  }

  @Post('/client/signup')
  signUpClient(@Body() dto: CreateUserDTO): Promise<{ token: string }> {
    return this.authService.signUp(dto, MemberType.CLIENT);
  }
}
