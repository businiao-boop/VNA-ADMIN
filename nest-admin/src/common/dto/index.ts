import { IsInt, IsOptional, IsArray, IsNumber } from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
class PaginationDto {
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => Array.isArray(value) ? value.map(Number) : [Number(value)])
  pageNum: number;
  @IsInt()
  @IsOptional()
  limit: number;
}

class BaseDto {
  @ApiPropertyOptional({ description: '菜单 ID,存在表示更新' })
  @IsOptional()
  @IsNumber()
  // @Transform(({ value }) => Array.isArray(value) ? value.map(Number) : [Number(value)])
  id?: number;
  @IsOptional()
  createdAt: Date;
  @IsOptional()
  updatedAt: Date;
  @IsOptional()
  deletedAt: Date;
}

export { PaginationDto, BaseDto };