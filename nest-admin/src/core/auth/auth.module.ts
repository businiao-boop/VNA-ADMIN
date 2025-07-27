import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { User } from "@/core/user/entities/user.entity";
import { Role } from "@/core/role/entities/role.entity";
import { Permission } from "@/core/permission/entities/permission.entity";
import { Menu } from "@/core/menu/entities/menu.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Permission, Menu]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: configService.get<string>("JWT_EXPIRES_IN") }
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { }