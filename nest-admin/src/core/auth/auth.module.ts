import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConfig } from '@/config/jwt.config';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '@/core/user/user.module';

@Module({
  imports: [UserModule, JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: jwtConfig,
  }),],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule { }
