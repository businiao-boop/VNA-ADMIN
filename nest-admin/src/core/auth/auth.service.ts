import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login-dto";
import { UserService } from "@/core/user/user.service";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { PayloadDto } from "./dto/payload-dto";
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}
  async validateUser(username: string, password: string) {
    // 验证用户逻辑
    const user = await this.userService.findOne({ username });
    if (!user) {
      throw new UnauthorizedException("用户不存在");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("密码错误");
    }
    return user;
  }
  async login(dto: LoginDto) {
    // 登录逻辑
    const user = await this.validateUser(dto.username, dto.password);
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async infoUser(user: PayloadDto) {
    return await this.userService.getUserProfile(user.userId);
  }
}
