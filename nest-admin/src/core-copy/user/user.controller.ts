import { Controller, Post, Body, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, QueryUserDto, PaginationDto } from "./dto/index.dto";
import { Public } from '@/common/decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post("save")
  create(@Body() userDto: UserDto) {
    return this.userService.save(userDto);
  }

  @Post("listAndCount")
  listAndCount(@Body() body?: QueryUserDto, @Query() query?: PaginationDto) {
    return this.userService.listAndCount(body, query);
  }
  @Post("list")
  list(@Body() body?: QueryUserDto) {
    return this.userService.list(body);
  }
  @Post("info")
  info(@Body("id") id: number) {
    return this.userService.info(id);
  }

  @Post("getUserProfile")
  infoUserProfile(@Req() req: any) {
    console.log(req.user);

    return this.userService.infoUserProfile(req.user.userId);

  }

  @Post("delete")
  remove(@Body("id") id: number) {
    return this.userService.softDeleteWithRelations(id);
  }

}
