import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { RegisterDto } from "./dto";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { UserDto } from "@/core/user/dto";

import { UserService } from "@/core/user/user.service";
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(username: string, password: string) {
    // 验证用户逻辑
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new UnauthorizedException("用户不存在");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("密码错误");
    }
    return user;
  }

  async login(username: string, password: string) {
    // 登录逻辑
    const user = await this.validateUser(username, password);
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(dto: UserDto) {
    const user = await this.userService.save(dto);
    return user;
  }
}
