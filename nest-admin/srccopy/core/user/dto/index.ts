
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserDto {
  @IsInt()
  @IsOptional()
  id?: number;
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsOptional()
  @IsString()
  password?: string;
  @IsOptional()
  @IsString()
  nickname?: string;
  @IsArray()
  @IsOptional()
  roleIds?: number[];
}