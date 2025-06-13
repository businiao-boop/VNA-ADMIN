import { IsArray, IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRoleDto {
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
