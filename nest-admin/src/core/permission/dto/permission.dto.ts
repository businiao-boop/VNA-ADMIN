import { IsString, IsOptional, IsNumber, IsArray } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BaseDto } from "@/common/dto";

/**
 * 创建/更新权限DTO
 */
export class CreatePermissionDto extends BaseDto {
  @ApiProperty({ description: "角色ID" })
  @IsNumber()
  roleId: number;

  @ApiProperty({ description: "菜单ID" })
  @IsNumber()
  menuId: number;

  @ApiProperty({ description: "权限操作数组", example: ["add", "edit", "view", "delete"] })
  @IsArray()
  @IsString({ each: true })
  actions: string[];
}

/**
 * 查询权限DTO
 */
export class QueryPermissionDto {
  @ApiPropertyOptional({ description: "角色ID" })
  @IsOptional()
  @IsNumber()
  roleId?: number;

  @ApiPropertyOptional({ description: "菜单ID" })
  @IsOptional()
  @IsNumber()
  menuId?: number;
}

/**
 * 分配权限DTO
 */
export class AssignPermissionDto {
  @ApiProperty({ description: "角色ID" })
  @IsNumber()
  roleId: number;

  @ApiProperty({ description: "权限配置数组" })
  @IsArray()
  permissions: Array<{
    menuId: number;
    actions: string[];
  }>;
}