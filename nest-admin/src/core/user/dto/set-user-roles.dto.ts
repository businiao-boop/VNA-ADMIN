// src/modules/user/dto/set-user-roles.dto.ts
import { IsArray, IsInt } from "class-validator";

export class SetUserRolesDto {
  @IsInt()
  userId: number;

  @IsArray()
  roleIds: number[];
}
