import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsArray,
  IsObject,
} from "class-validator";

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsOptional()
  remark?: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @IsOptional()
  @IsArray()
  menuIds?: number[]; // 菜单 ID 数组

  @IsObject()
  permissions: Record<string, string[]>;
}
