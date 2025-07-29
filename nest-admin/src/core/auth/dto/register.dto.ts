import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator";

export class RegisterDto {
  @ApiProperty({ description: "用户名", example: "user123" })
  @IsNotEmpty({ message: "用户名不能为空" })
  @IsString()
  @MinLength(3, { message: "用户名至少3个字符" })
  @MaxLength(20, { message: "用户名最多20个字符" })
  username: string;

  @ApiProperty({ description: "密码", example: "123456" })
  @IsNotEmpty({ message: "密码不能为空" })
  @IsString()
  @MinLength(6, { message: "密码至少6个字符" })
  @MaxLength(32, { message: "密码最多32个字符" })
  password: string;
}

export class RegisterResponseDto {
  @ApiProperty({ description: "用户ID" })
  id: number;

  @ApiProperty({ description: "用户名" })
  username: string;

  @ApiProperty({ description: "注册时间" })
  createdAt: Date;
}