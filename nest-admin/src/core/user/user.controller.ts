import { Body, Controller, Post, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Public } from "@/common/decorators/public.decorator";
import { SaveUserDto } from "./dto/save-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("find")
  find(@Body() body: Omit<UpdateUserDto, "roles">) {
    return this.userService.find(body);
  }

  @Post("list") // 查询用户列表
  list(@Query() { page, pageSize }) {
    return this.userService.list({ page, pageSize });
  }

  @Public()
  @Post("save")
  save(@Body() body: SaveUserDto) {
    return this.userService.save(body);
  }

  @Post("remove")
  remove(@Body("id") id: number) {
    return this.userService.softDeleteWithRelations(id);
  }
}
