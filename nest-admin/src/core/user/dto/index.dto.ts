import { PartialType } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "@/common/dto/"
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

export class QueryUserDto extends PartialType(UserDto) {
}

export { PaginationDto }