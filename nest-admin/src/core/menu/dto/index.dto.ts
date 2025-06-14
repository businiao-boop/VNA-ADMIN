import { PartialType } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsInt, IsNumber, IsOptional, IsString } from "class-validator";

import { TypeEnum, LayoutEnum } from "../enum/menu.enum";

export class MenuDto {
  @IsInt()
  @IsOptional()
  id?: number;
  @IsString()
  menuName: string;
  @IsString()
  path: string;
  @IsString()
  routerName: string;
  @IsString()
  component: string;
  @IsInt()
  @IsOptional()
  parentId: number;
  @IsInt()
  @IsOptional()
  sort: number;
  @IsString()
  @IsOptional()
  icon?: string;
  @IsEnum(LayoutEnum)
  @IsOptional()
  layout?: LayoutEnum;

  @IsEnum(TypeEnum)
  @IsOptional()
  type?: TypeEnum;
  @IsBoolean()
  @IsOptional()
  show?: boolean;
  @IsBoolean()
  @IsOptional()
  keepAlive?: boolean;
  @IsBoolean()
  @IsOptional()
  isExternal?: boolean;
  @IsString()
  @IsOptional()
  externalLink?: string;
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
  @IsArray()
  @IsOptional()
  roleIds: number[];
  @IsArray()
  @IsOptional()
  permissionIds: number[];


}