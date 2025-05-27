import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login-dto";
import { Public } from "@/common/decorators/public.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post("login")
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // @Public()
  @Post("user")
  infoUser(@Req() req: any) {
    return this.authService.infoUser(req.user);
  }
  // @Public()
  // @Post("user")
  // infoUser(@Body() loginDto: LoginDto) {
  //   return this.authService.infoUser(loginDto);
  // }
}
