import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({ description: "用户名", example: "admin" })
  @IsNotEmpty({ message: "用户名不能为空" })
  @IsString()
  username: string;

  @ApiProperty({ description: "密码", example: "123456" })
  @IsNotEmpty({ message: "密码不能为空" })
  @IsString()
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({ description: "访问令牌" })
  accessToken: string;
}