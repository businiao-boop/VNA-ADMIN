import { BaseDto, PaginationDto } from '@/common/dto';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
  IsEnum,
  IsArray
} from 'class-validator';
import { MenuTypeEnum } from '@/common/enums/menu.enum';

export class SaveMenuDto extends BaseDto {

  @ApiProperty({ description: '菜单名称' })
  @IsString()
  menuName: string;

  @ApiPropertyOptional({
    description: '父级菜单 ID',
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  parentId?: number;

  @ApiPropertyOptional({
    description: '菜单类型: dir（目录）、menu（菜单）、ide（按钮）',
    default: MenuTypeEnum.DIRECTORY,
    enum: MenuTypeEnum,
  })
  @IsOptional()
  @IsEnum(MenuTypeEnum)
  type?: MenuTypeEnum;

  @ApiProperty({ description: '菜单路径' })
  @IsString()
  path: string;

  @ApiPropertyOptional({
    description: '前端组件路径',
    default: 'Layout',
  })
  @IsOptional()
  @IsString()
  component?: string;

  @ApiPropertyOptional({ description: '菜单权限 id 集合' })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  permissionIds?: number[];

  @ApiPropertyOptional({ description: '菜单图标' })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiPropertyOptional({ description: '菜单排序', default: 0 })
  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiPropertyOptional({ description: '是否可见', default: true })
  @IsOptional()
  @IsBoolean()
  visible?: boolean;

  @ApiPropertyOptional({ description: '是否启用', default: true })
  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @ApiPropertyOptional({ description: '是否缓存页面', default: true })
  @IsOptional()
  @IsBoolean()
  keepAlive?: boolean;
}

export class QueryMenuDto extends PartialType(SaveMenuDto) {
  // @IsNumber()
  // id: number;
}

export class InfoMenuDto {
  @IsNumber()
  id: number;
}

export { PaginationDto }