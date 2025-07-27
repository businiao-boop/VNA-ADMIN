import { IsString, IsOptional, IsNumber } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { BaseDto } from "@/common/dto";

/**
 * 创建/更新菜单DTO
 */
export class CreateMenuDto extends BaseDto {
  @ApiProperty({ description: "菜单名称" })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: "路由路径" })
  @IsOptional()
  @IsString()
  path?: string;

  @ApiPropertyOptional({ description: "组件路径" })
  @IsOptional()
  @IsString()
  component?: string;

  @ApiPropertyOptional({ description: "图标" })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiPropertyOptional({ description: "父菜单ID" })
  @IsOptional()
  @IsNumber()
  parentId?: number;

  @ApiPropertyOptional({ description: "排序", default: 0 })
  @IsOptional()
  @IsNumber()
  sort?: number;

  @ApiPropertyOptional({ description: "状态：1正常 0禁用", default: 1 })
  @IsOptional()
  @IsNumber()
  status?: number;
}

/**
 * 查询菜单DTO
 */
export class QueryMenuDto {
  @ApiPropertyOptional({ description: "菜单名称" })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value === "" ? undefined : value)
  name?: string;

  @ApiPropertyOptional({ description: "父菜单ID" })
  @IsOptional()
  @IsNumber()
  parentId?: number;

  @ApiPropertyOptional({ description: "状态：1正常 0禁用" })
  @IsOptional()
  @IsNumber()
  status?: number;
}