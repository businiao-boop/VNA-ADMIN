// src/modules/permission/dto/create-permission.dto.ts
import { IsString, IsOptional, IsBoolean, IsArray } from "class-validator";

export class SavePermissionDto {
  @IsOptional()
  id?: number;

  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isEnabled?: boolean;

  @IsOptional()
  @IsArray()
  menuIds?: number[];
}
