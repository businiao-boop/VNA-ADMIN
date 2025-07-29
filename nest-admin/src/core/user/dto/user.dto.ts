import { IsString, IsOptional, IsEmail, IsNumber } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { BaseDto } from "@/common/dto";

/**
 * 创建/更新用户DTO
 */
export class CreateUserDto extends BaseDto {
  @ApiProperty({ description: "用户名" })
  @IsString()
  username: string;

  @ApiPropertyOptional({ description: "密码" })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({ description: "昵称" })
  @IsOptional()
  @IsString()
  nickname?: string;

  @ApiPropertyOptional({ description: "邮箱" })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: "手机号" })
  @IsOptional()
  @IsString()
  phone?: string;

  // @ApiPropertyOptional({ description: "是否启用：true启用 false禁用", default: true })
  // @IsOptional()
  // isActive?: boolean;

  @ApiPropertyOptional({ description: "状态：1正常 0禁用", default: 1 })
  @IsOptional()
  @IsNumber()
  status?: number;

  @ApiPropertyOptional({ description: "角色ID数组" })
  @IsOptional()
  @IsNumber({}, { each: true })
  roleIds?: number[];
}

/**
 * 查询用户DTO
 */
export class QueryUserDto {
  @ApiPropertyOptional({ description: "用户名" })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value === "" ? undefined : value)
  username?: string;

  @ApiPropertyOptional({ description: "昵称" })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value === "" ? undefined : value)
  nickname?: string;

  @ApiPropertyOptional({ description: "邮箱" })
  @IsOptional()
  @IsEmail()
  @Transform(({ value }) => value === "" ? undefined : value)
  email?: string;

  @ApiPropertyOptional({ description: "手机号" })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value === "" ? undefined : value)
  phone?: string;

  @ApiPropertyOptional({ description: "是否启用：true启用 false禁用" })
  @IsOptional()
  @IsNumber()
  isActive?: number;

  @ApiPropertyOptional({ description: "状态：1正常 0禁用" })
  @IsOptional()
  @IsNumber()
  status?: number;
}