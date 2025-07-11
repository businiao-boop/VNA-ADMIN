import { BaseDto } from '@/common/dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  parentId?: number = 0;

  @ApiPropertyOptional({
    description: '菜单类型: dir（目录）、menu（菜单）、ide（按钮）',
    default: MenuTypeEnum.MENU,
    enum: MenuTypeEnum,
  })
  @IsOptional()
  @IsEnum(MenuTypeEnum)
  type?: MenuTypeEnum = MenuTypeEnum.MENU;

  @ApiProperty({ description: '菜单路径' })
  @IsString()
  path: string;

  @ApiPropertyOptional({
    description: '前端组件路径',
    default: 'Layout',
  })
  @IsOptional()
  @IsString()
  component?: string = 'Layout';

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
  order?: number = 0;

  @ApiPropertyOptional({ description: '是否可见', default: true })
  @IsOptional()
  @IsBoolean()
  visible?: boolean = true;

  @ApiPropertyOptional({ description: '是否启用', default: true })
  @IsOptional()
  @IsBoolean()
  status?: boolean = true;

  @ApiPropertyOptional({ description: '是否缓存页面', default: true })
  @IsOptional()
  @IsBoolean()
  keepAlive?: boolean = true;
}
