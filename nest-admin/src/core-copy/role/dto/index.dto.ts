import { PartialType } from '@nestjs/swagger';
import { Transform } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PaginationDto, BaseDto } from "@/common/dto"

import { MenuDto } from "@/core-copy/menu/dto/index.dto";

export class RoleDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  code: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsArray()
  @IsOptional()
  menuList: MenuDto[];
}

export class QueryRoleDto extends PartialType(RoleDto) {
}

export { PaginationDto }