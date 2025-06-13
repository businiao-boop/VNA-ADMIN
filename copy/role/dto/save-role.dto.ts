import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsArray,
  IsObject,
  IsInt,
} from "class-validator";

export class SaveRoleDto {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  code?: string;

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
  @IsOptional()
  permissions: Record<string, string[]>;
}
