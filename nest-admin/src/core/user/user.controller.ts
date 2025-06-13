import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from "./dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("save")
  create(@Body() createUserDto: UserDto) {
    return this.userService.save(createUserDto);
  }

}
