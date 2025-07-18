import { BaseDto, PaginationDto } from '@/common/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class SaveRoleDto extends BaseDto {
  @ApiProperty({ description: '角色名称' })
  @IsString()
  name: string;
  @ApiProperty({ description: '角色描述' })
  @IsString()
  @IsOptional()
  description?: string;
  @ApiProperty({ description: '角色唯一标识' })
  @IsString()
  code: string;
}

export class QueryRoleDto extends PartialType(SaveRoleDto) {

}

export class InfoRoleDto {
  @ApiProperty({ description: '角色id' })
  @IsNumber()
  id: number;
}

export { PaginationDto }