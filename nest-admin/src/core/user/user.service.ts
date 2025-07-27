import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import { BaseService } from "@/common/base/base.service";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/user.dto";

/**
 * 用户服务
 */
@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    super(userRepository);
  }

  /**
   * 创建用户
   */
  async createUser(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { username: dto.username },
    });

    if (existingUser) {
      throw new ConflictException("用户名已存在");
    }

    if (!dto.password || dto.password.trim() === "") {
      throw new ConflictException("密码不能为空");
    }

    const user = this.userRepository.create({
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    });

    if (dto.roleIds && dto.roleIds.length > 0) {
      user.roles = dto.roleIds.map((id) => ({ id } as any));
    }

    return await this.userRepository.save(user);
  }

  /**
   * 更新用户
   */
  async updateUser(id: number, dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["roles"],
    });

    if (!user) {
      throw new NotFoundException("用户不存在");
    }

    if (dto.username && dto.username !== user.username) {
      const existingUser = await this.userRepository.findOne({
        where: { username: dto.username },
      });
      if (existingUser) {
        throw new ConflictException("用户名已存在");
      }
    }

    if (dto.password && dto.password.trim() !== "") {
      dto.password = await bcrypt.hash(dto.password, 10);
    } else {
      // 不更新密码字段，保持原密码
      delete dto.password;
    }

    Object.assign(user, dto);

    if (dto.roleIds) {
      user.roles = dto.roleIds.map((id) => ({ id } as any));
    }

    return await this.userRepository.save(user);
  }

  /**
   * 获取用户详情
   */
  async getUserDetail(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["roles"],
    });

    if (!user) {
      throw new NotFoundException("用户不存在");
    }

    return user;
  }
}