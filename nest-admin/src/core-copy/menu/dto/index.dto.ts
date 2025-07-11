import { PartialType } from '@nestjs/swagger';
import { PaginationDto } from "@/common/dto";
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsInt,
  Min,
  MaxLength,
  IsArray,
} from 'class-validator';
import { MenuTypeEnum, MenuLayoutEnum } from "@/common/enums/menu.enum";
import { PermissionDto } from "@/core-copy/permission/dto/index.dto";
import { ApiProperty } from "@nestjs/swagger";

export class MenuDto {
  @IsOptional()
  @IsInt()
  id: number;

  @IsString()
  @MaxLength(100)
  menuName: string;

  @IsString()
  @MaxLength(100)
  path: string;

  @IsString()
  @MaxLength(100)
  routerName: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  component: string;

  @IsInt()
  @IsOptional()
  parentId: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  sort: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  icon?: string;

  @IsOptional()
  @IsEnum(MenuLayoutEnum)
  layout: MenuLayoutEnum;

  @IsOptional()
  @IsEnum(MenuTypeEnum)
  type: MenuTypeEnum;

  @IsBoolean()
  @IsOptional()
  show: boolean;

  @IsBoolean()
  @IsOptional()
  keepAlive: boolean;


  @IsBoolean()
  @IsOptional()
  isExternal: boolean;

  @IsOptional()
  @IsString()
  externalLink?: string;

  @IsBoolean()
  @IsOptional()
  isPublic: boolean;

  @IsArray()
  @IsOptional()
  permissions?: PermissionDto[];

  @IsArray()
  @IsOptional()
  permissionIds?: number[];
}

export class QueryMenuDto extends PartialType(MenuDto) {

}

export { PaginationDto }