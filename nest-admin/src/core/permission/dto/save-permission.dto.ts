// src/modules/permission/dto/create-permission.dto.ts
import { IsString, IsOptional, IsBoolean } from "class-validator";

export class SavePermissionDto {
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
}
