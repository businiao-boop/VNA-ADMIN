import { IsInt, IsOptional, IsArray } from "class-validator";
import { Transform } from "class-transformer";
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
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => Array.isArray(value) ? value.map(Number) : [Number(value)])
  id?: number[];
  @IsOptional()
  createdAt: Date;
  @IsOptional()
  updatedAt: Date;
  @IsOptional()
  deletedAt: Date;
}

export { PaginationDto, BaseDto };