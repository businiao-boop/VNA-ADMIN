import { Controller, Post, Body, HttpCode, HttpStatus, Req } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto, LoginResponseDto } from "./dto/login.dto";
import { RegisterDto, RegisterResponseDto } from "./dto/register.dto";
import { Public } from "@/common/decorators";

@ApiTags("认证")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
   * 用户登录
   * @param loginDto 登录信息
   * @returns 登录结果
   */
  @Public()
  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "用户登录" })
  @ApiResponse({
    status: 200,
    description: "登录成功",
    type: LoginResponseDto
  })
  @ApiResponse({ status: 401, description: "用户名或密码错误" })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.username, loginDto.password);
  }

  /**
   * 获取用户资料
   * @param req 请求对象，包含用户信息
   * @returns 用户完整资料
   */
  @Post("profile")
  @ApiOperation({ summary: "获取用户资料" })
  @ApiResponse({
    status: 200,
    description: "获取成功"
  })
  @ApiResponse({ status: 401, description: "未授权" })
  async getUserProfile(@Req() req: any) {
    const userId = req.user.userId;
    return this.authService.getUserProfile(userId);
  }

  /**
   * 用户注册
   * @param registerDto 注册信息
   * @returns 注册结果
   */
  @Public()
  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "用户注册" })
  @ApiResponse({
    status: 201,
    description: "注册成功",
    type: RegisterResponseDto
  })
  @ApiResponse({ status: 400, description: "注册失败" })
  @ApiResponse({ status: 409, description: "用户名已存在" })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto.username, registerDto.password);
  }
}