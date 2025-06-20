import { PaginationDto } from "@/common/dto";
import { PartialType } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
export class PermissionDto {
  @IsInt()
  @IsOptional()
  id: number;
  @IsString()
  @IsNotEmpty()
  code: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsOptional()
  description: string;
}

export class QueryPermissionDto extends PartialType(PermissionDto) { }

export { PaginationDto }