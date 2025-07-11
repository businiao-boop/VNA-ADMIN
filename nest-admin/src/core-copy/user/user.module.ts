import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserEntity } from "./entities/user.entity";

import { UserService } from './user.service';
import { UserController } from './user.controller';

import { RoleModule } from "@/core-copy/role/role.module";


@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), RoleModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
