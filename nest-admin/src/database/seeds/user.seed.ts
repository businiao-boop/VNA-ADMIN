import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "@/core/user/entities/user.entity";
import { Role } from "@/core/role/entities/role.entity";
import * as bcrypt from "bcryptjs";

/**
 * 用户数据初始化
 */
@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  /**
   * 初始化默认超级管理员用户
   */
  async seedDefaultUsers() {
    // 确保管理员角色存在
    const adminRole = await this.roleRepository.findOne({
      where: { code: 'admin' }
    });

    if (!adminRole) {
      console.log('管理员角色不存在，请先初始化角色数据');
      return;
    }

    // 检查超级管理员用户是否已存在
    const existingAdmin = await this.userRepository.findOne({
      where: { username: 'admin' }
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      const adminUser = this.userRepository.create({
        username: 'admin',
        password: hashedPassword,
        nickname: '超级管理员',
        email: 'admin@example.com',
        phone: '13800138000',
        status: 1,
        roles: [adminRole]
      });

      await this.userRepository.save(adminUser);
      console.log('Created default super admin user: admin (password: admin123)');
    }

    // 检查测试用户是否存在
    const existingTestUser = await this.userRepository.findOne({
      where: { username: 'test' }
    });

    if (!existingTestUser) {
      const userRole = await this.roleRepository.findOne({
        where: { code: 'user' }
      });

      if (userRole) {
        const hashedPassword = await bcrypt.hash('test123', 10);
        
        const testUser = this.userRepository.create({
          username: 'test',
          password: hashedPassword,
          nickname: '测试用户',
          email: 'test@example.com',
          phone: '13800138001',
          status: 1,
          roles: [userRole]
        });

        await this.userRepository.save(testUser);
        console.log('Created default test user: test (password: test123)');
      }
    }
  }
}