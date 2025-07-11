import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from "@nestjs/jwt";

import { UserService } from '@/core-copy/user/user.service';
import { LoginDto } from "./dto/login.dto"
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) { }

  async validateUser(username: string, password: string) {
    // 验证用户逻辑
    const user = await this.userService.infoUserProfile(undefined, username);
    if (!user) {
      throw new NotFoundException("用户不存在");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("密码错误");
    }
    return user;
  }
  async login(loginDto: LoginDto) {
    const { username, password, rememberMe } = loginDto;
  // 验证用户
    const user = await this.validateUser(username, password);

    const payload = {
      username: user.username,
      sub: user.id,
      permissionKeys: user.permissionKeys
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
