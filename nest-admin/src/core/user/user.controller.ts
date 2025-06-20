import { Controller, Post, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, QueryUserDto, PaginationDto } from "./dto/index.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("save")
  create(@Body() userDto: UserDto) {
    return this.userService.save(userDto);
  }

  @Post("list")
  list(@Body() body?: QueryUserDto, @Query() query?: PaginationDto) {
    return this.userService.list(body, query);
  }
  @Post("info")
  info(@Body("id") id: number) {
    return this.userService.info(id);
  }

  @Post("getUserProfile")
  infoUserProfile(@Body() body: { id: number, username: string }) {
    return this.userService.infoUserProfile(body.id, body.username);
  }

  @Post("delete")
  remove(@Body("id") id: number) {
    return this.userService.softDeleteWithRelations(id);
  }

}
