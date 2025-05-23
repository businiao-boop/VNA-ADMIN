// src/modules/role/dto/set-role-menus.dto.ts
import { IsArray, IsInt } from "class-validator";

export class SetRoleMenusDto {
  @IsInt()
  roleId: number;

  @IsArray()
  menuIds: number[];
}
