import { defineStore } from 'pinia';
import router from '@/router';
import { getUserProfile as apiGetUserProfile } from '@/api/auth';
import { buildTree } from '@/utils/buildTree';
import BasicLayout from '@/layouts/BasicLayout.vue';
// 动态导入组件映射
const modules = import.meta.glob("@/views/**/*.vue");

// 动态加载组件
const loadComponent = (view) => {
  const matchedModule = Object.entries(modules).find(([path]) => 
    path.replace('/src/views/', '@/views/') === view
  );
  
  return matchedModule?.[1] || (() => import('@/views/login/index.vue'));
};

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
    token: localStorage.getItem('token') || '',
    routes: [],
    menuTree: [] // 存储处理后的菜单树
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    userRoles: (state) => state.userInfo?.roles || [],
    userMenus: (state) => state.userInfo?.menus || [],
    getMenuTree: (state) => state.menuTree
  },

  actions: {
    // 设置用户信息
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
      // 同时处理菜单树
      if (userInfo && userInfo.menus) {
        this.menuTree = this.buildMenuTree(userInfo.menus);
      }
    },

    // 构建菜单树
    buildMenuTree(menus) {
      // 使用 buildTree 构建基础树结构
      const tree = buildTree(menus);

      // 递归处理路径拼接
      const processPath = (nodes, parentPath = '') => {
        nodes.forEach(node => {
          let fullPath = node.path;
          
          if (parentPath && !node.path?.startsWith('/')) {
            fullPath = `${parentPath}/${node.path}`.replace(/\/+/g, '/');
          } else if (!node.path || node.path === '') {
            fullPath = parentPath;
          }
          
          node.path = fullPath;
          
          if (node.children && node.children.length > 0) {
            processPath(node.children, fullPath);
          }
        });
      };
      processPath(tree);
      return tree;
    },

    // 设置token
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },

    // 清除用户信息（用于登出）
    clearUserInfo() {
      this.userInfo = null;
      this.token = '';
      this.routes = [];
      localStorage.removeItem('token');
    },

    // 根据菜单数据生成路由
    generateRoutes(menus) {
      if (!menus || !Array.isArray(menus)) {
        console.warn('菜单数据格式不正确');
        return;
      }

      // 递归处理菜单数据生成路由配置
      const processMenu = (menu) => {
        const route = {
          path: menu.path,
          name: menu.name,
          meta: {
            title: menu.name,
            icon: menu.icon,
            permissions: menu.permission || [],
            roles: menu.roleId ? [menu.roleId] : []
          }
        };

        // 处理组件路径
        if (menu.component?.startsWith('@/')) {
          route.component = loadComponent(menu.component);
        } else {
          route.component = BasicLayout;
        }

        // 处理嵌套路由
        if (menu.children?.length > 0) {
          route.children = menu.children.map(processMenu);
        }

        return route;
      };

      // 使用已构建的菜单树生成路由
      const dynamicRoutes = this.menuTree
        .filter(menu => menu.status === 1) // 只添加状态为启用的菜单
        .map(processMenu);

      // 将动态路由添加到路由表中
      dynamicRoutes.forEach(route => {
        router.addRoute(route);
      });
    },

    // 检查用户是否有权限
    hasPermission(permission) {
      if (!this.userInfo || !this.userInfo.menus) return false;

      return this.userInfo.menus.some(menu =>
        menu.permission && menu.permission.includes(permission)
      );
    },

    // 检查用户是否有角色
    hasRole(roleCode) {
      if (!this.userInfo || !this.userInfo.roles) return false;

      return this.userInfo.roles.some(role => role.code === roleCode);
    },

    // 获取用户信息（用于路由守卫）
    async getUserProfile() {
      try {
        const response = await apiGetUserProfile();
        return response;
      } catch (error) {
        console.error('获取用户信息失败:', error);
        throw error;
      }
    },

    // 登出
    async logout() {
      this.clearUserInfo();
      router.push('/login');
    }
  }
});