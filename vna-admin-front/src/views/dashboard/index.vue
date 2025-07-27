<template>
  <div class="dashboard">
    <a-row :gutter="24" class="dashboard-row">
      <a-col :span="6">
        <a-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon">
              <UserOutlined />
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.userCount }}</div>
              <div class="stat-label">用户总数</div>
            </div>
          </div>
        </a-card>
      </a-col>
      
      <a-col :span="6">
        <a-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon">
              <TeamOutlined />
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.roleCount }}</div>
              <div class="stat-label">角色总数</div>
            </div>
          </div>
        </a-card>
      </a-col>
      
      <a-col :span="6">
        <a-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon">
              <MenuOutlined />
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.menuCount }}</div>
              <div class="stat-label">菜单总数</div>
            </div>
          </div>
        </a-card>
      </a-col>
      
      <a-col :span="6">
        <a-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon">
              <LockOutlined />
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.permissionCount }}</div>
              <div class="stat-label">权限总数</div>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
    
    <a-row :gutter="24" class="dashboard-row">
      <a-col :span="12">
        <a-card title="系统信息" class="info-card">
          <a-descriptions :column="1" bordered>
            <a-descriptions-item label="系统名称">VNA-Admin 管理系统</a-descriptions-item>
            <a-descriptions-item label="版本号">v1.0.0</a-descriptions-item>
            <a-descriptions-item label="前端框架">Vue 3 + Vite</a-descriptions-item>
            <a-descriptions-item label="UI框架">Ant Design Vue</a-descriptions-item>
            <a-descriptions-item label="后端框架">NestJS + TypeORM</a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-col>
      
      <a-col :span="12">
        <a-card title="最近操作" class="info-card">
          <a-timeline>
            <a-timeline-item color="green">
              用户登录 - 2分钟前
            </a-timeline-item>
            <a-timeline-item color="green">
              创建新用户 - 5分钟前
            </a-timeline-item>
            <a-timeline-item color="blue">
              更新角色权限 - 10分钟前
            </a-timeline-item>
            <a-timeline-item color="red">
              删除菜单 - 15分钟前
            </a-timeline-item>
          </a-timeline>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { UserOutlined, TeamOutlined, MenuOutlined, LockOutlined } from '@ant-design/icons-vue';

const stats = reactive({
  userCount: 0,
  roleCount: 0,
  menuCount: 0,
  permissionCount: 0
});

const loadStats = async () => {
  // 模拟加载统计数据
  stats.userCount = 156;
  stats.roleCount = 12;
  stats.menuCount = 45;
  stats.permissionCount = 128;
};

onMounted(() => {
  loadStats();
});
</script>

<style scoped lang="scss">
.dashboard {
  padding: 24px;
  
  .dashboard-row {
    margin-bottom: 24px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .stat-card {
    .stat-content {
      display: flex;
      align-items: center;
      
      .stat-icon {
        font-size: 48px;
        color: #1890ff;
        margin-right: 16px;
      }
      
      .stat-info {
        .stat-number {
          font-size: 28px;
          font-weight: bold;
          color: #262626;
          margin-bottom: 4px;
        }
        
        .stat-label {
          color: #8c8c8c;
          font-size: 14px;
        }
      }
    }
  }
  
  .info-card {
    min-height: 300px;
  }
}
</style>