import { IsInt, IsOptional } from "class-validator";

export class RoleMenuPermissionDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsInt()
  roleId: number;

  @IsInt()
  menuId: number;

  @IsInt()
  @IsOptional()
  permissionId: number;
}