import { PartialType } from '@nestjs/swagger';
import { IsArray, IsInt, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateRoleDto } from "./create-role.dto"

import { UpdateRoleDto } from "./update-role.dto"

export { CreateRoleDto, UpdateRoleDto }

// export class RoleDto extends PartialType(CreateRoleDto) {
// }

export class RoleDto {
  @IsInt()
  @IsOptional()
  id?: number;
  @IsString()
  name: string;
  @IsString()
  code: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsArray()
  @IsOptional()
  menuIds?: string[];
}