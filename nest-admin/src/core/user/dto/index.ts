import { CreateUserDto } from "./create-user.dto"
import { UpdateUserDto } from "./update-user.dto"
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
export {
  CreateUserDto,
  UpdateUserDto
}

import { PartialType } from '@nestjs/swagger';


export class UserDto {
  @IsInt()
  @IsOptional()
  id?: number;
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsOptional()
  @IsString()
  password?: string;
  @IsOptional()
  @IsString()
  nickname?: string;
  @IsArray()
  @IsOptional()
  roleIds?: number[];
}