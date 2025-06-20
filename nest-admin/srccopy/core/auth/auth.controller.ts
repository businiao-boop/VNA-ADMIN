import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto";
import { Public } from "@/common/decorators/public.decorator";

import { UserDto } from "@/core/user/dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post("login")
  async login(@Body() body: { username: string, password: string }) {
    const { username, password } = body;
    return this.authService.login(username, password);
  }

  @Public()
  @Post("register")
  async register(@Body() body: UserDto) {
    console.log(body, "auth body");

    return this.authService.register(body);
  }

  @Post("user")
  infoUser(@Req() req: any) {
    return this.authService.infoUser(req.user);
  }

}
