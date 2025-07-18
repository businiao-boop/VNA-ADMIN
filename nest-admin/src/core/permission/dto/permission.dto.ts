import { BaseDto, PaginationDto } from "@/common/dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsNumber } from "class-validator";
import { PartialType } from "@nestjs/swagger"

export class SavePermissionDto extends BaseDto {
  @ApiProperty({ description: '唯一标识' })
  @IsString()
  code: string;
  @ApiProperty({ description: '权限名称' })
  @IsString()
  name: string;

  @ApiProperty({ description: '权限描述' })
  @IsString()
  @IsOptional()
  description: string;
}
export class QueryPermissionDto extends PartialType(SavePermissionDto) {
}
export class InfoPermissionDto {
  @ApiProperty({ description: '权限id' })
  @IsNumber()
  id: number;
}

export {
  PaginationDto
}