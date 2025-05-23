import {
  IsEnum,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsEmail,
  IsDateString,
  Length,
  IsArray,
  IsInt,
} from "class-validator";
import { GenderEnum } from "../enums/gender.enum";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: "用户名不能为空" })
  @Length(3, 50, { message: "用户名长度应为 3-50 个字符" })
  username: string;

  @IsString()
  @IsNotEmpty({ message: "密码不能为空" })
  password: string;

  @IsOptional()
  @IsEnum(GenderEnum, { message: "性别必须是 male、female 或 unknown" })
  gender?: GenderEnum;

  // @IsOptional()
  // @IsString()
  // roles: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  roles?: number[]; // 👉 新增：用户关联的角色 ID 数组

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsEmail({}, { message: "邮箱格式不正确" })
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsDateString({}, { message: "生日格式应为日期字符串" })
  birthday?: Date;
}
