import { Controller, Post, Body, Query, ValidationPipe } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiQuery } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { CreateUserDto, QueryUserDto } from "./dto/user.dto";
import { PaginationDto } from "@/common/dto";
import { Public } from "@/common/decorators";

/**
 * 用户控制器
 */
@ApiTags("用户管理")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 查询所有用户数据
   */
  @Public()
  @Post("list")
  @ApiOperation({ summary: "查询所有用户数据" })
  async getUserList(@Body() query: QueryUserDto) {
    const data = await this.userService.findAll({
      where: query,
    });
    return { data };
  }

  /**
   * 分页查询用户数据
   */
  @Public()
  @Post("page")
  @ApiOperation({ summary: "分页查询用户数据" })
  @ApiQuery({ name: "pageNum", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  async getUserPage(
    @Query(ValidationPipe) pagination: PaginationDto,
    @Body() query: QueryUserDto
  ) {
    const { data, total } = await this.userService.findAllAndCount(
      { where: query },
      pagination
    );
    return { data, total };
  }

  /**
   * 创建用户
   */
  @Public()
  @Post("save")
  @ApiOperation({ summary: "创建/更新用户" })
  async saveUser(@Body() dto: CreateUserDto) {
    if (dto.id) {
      const user = await this.userService.updateUser(dto.id, dto);
      return { message: "更新成功", data: user };
    } else {
      const user = await this.userService.createUser(dto);
      return { message: "创建成功", data: user };
    }
  }

  /**
   * 获取用户详情
   */
  @Public()
  @Post("detail")
  @ApiOperation({ summary: "获取用户详情" })
  async getUserDetail(@Body("id") id: number) {
    const user = await this.userService.getUserDetail(id);
    return { data: user };
  }

  /**
   * 软删除用户
   */
  @Public()
  @Post("delete")
  @ApiOperation({ summary: "软删除用户" })
  async deleteUser(@Body("id") id: number) {
    await this.userService.softDeleteWithRelations(id);
    return { message: "删除成功" };
  }
}