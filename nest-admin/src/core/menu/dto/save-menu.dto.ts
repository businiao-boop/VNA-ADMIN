import {
  IsEnum,
  IsOptional,
  IsString,
  IsBoolean,
  IsInt,
  IsArray,
} from "class-validator";
import { TypeEnum, LayoutEnum } from "../enum/menu.enum";

export class SaveMenuDto {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsString()
  name: string;

  @IsString()
  path: string;

  @IsString()
  component: string;

  @IsInt()
  parentId: number;

  @IsInt()
  sort: number;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsEnum(LayoutEnum)
  layout: LayoutEnum;

  @IsEnum(TypeEnum)
  type: TypeEnum;

  @IsBoolean()
  show: boolean;

  @IsBoolean()
  keepAlive: boolean;

  @IsOptional()
  @IsArray()
  permissionIds?: string[];

  @IsBoolean()
  isExternal: boolean;

  @IsOptional()
  @IsString()
  externalLink?: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}
