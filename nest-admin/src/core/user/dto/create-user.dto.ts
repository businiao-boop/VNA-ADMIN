import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsOptional()
  @IsString()
  nickname?: string;
  @IsArray()
  roleIds?: number[];
}