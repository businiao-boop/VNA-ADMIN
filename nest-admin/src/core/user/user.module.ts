import { Module } from "@nestjs/common";
import { DataSource } from "typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserEntity } from "./entities/user.entity";
import { UserRoleEntity } from "./entities/user-role.entity";
import { RoleEntity } from "../role/entities/role.entity";
// import { BaseRepository } from "@/common/repositories/base.repository";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserRoleEntity, RoleEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    // {
    //   provide: "USER_REPOSITORY",
    //   useFactory: (dataSource: DataSource) => {
    //     return dataSource.getRepository(UserEntity).extend(BaseRepository);
    //   },
    //   inject: [DataSource],
    // },
  ],
  // exports: ["USER_REPOSITORY"],
  exports: [UserService],
})
export class UserModule {}
