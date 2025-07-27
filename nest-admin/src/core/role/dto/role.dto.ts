import { IsString, IsOptional, IsNumber } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { BaseDto } from "@/common/dto";

/**
 * 创建/更新角色DTO
 */
export class CreateRoleDto extends BaseDto {
  @ApiProperty({ description: "角色名称" })
  @IsString()
  name: string;

  @ApiProperty({ description: "角色编码" })
  @IsString()
  code: string;

  @ApiPropertyOptional({ description: "描述" })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: "状态：1正常 0禁用", default: 1 })
  @IsOptional()
  @IsNumber()
  status?: number;
}

/**
 * 查询角色DTO
 */
export class QueryRoleDto {
  @ApiPropertyOptional({ description: "角色名称" })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value === "" ? undefined : value)
  name?: string;

  @ApiPropertyOptional({ description: "角色编码" })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value === "" ? undefined : value)
  code?: string;

  @ApiPropertyOptional({ description: "状态：1正常 0禁用" })
  @IsOptional()
  @IsNumber()
  status?: number;
}