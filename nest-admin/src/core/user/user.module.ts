import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserEntity } from "./entities/user.entity";
import { RoleEntity } from '@/core/role/entities/role.entity';

import { UserService } from './user.service';
import { UserController } from './user.controller';

import { RoleModule } from '@/core/role/role.module';

@Module({
  imports: [RoleModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
