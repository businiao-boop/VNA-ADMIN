import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from "./dto/login.dto"
import { Auth, Public } from '@/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post("login")
  create(@Body() loginDto: LoginDto) {
    console.log(loginDto, "----");

    return this.authService.login(loginDto);
  }
}
