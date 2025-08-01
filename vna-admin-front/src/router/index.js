import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/index.vue'),
    meta: { title: '注册' }
  },
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/views/example/useModal.vue'),
    meta: { title: '示例' }
  },
  // {
  //   path: "/system",
  //   name: "System",
  //   component: () => import("@/layouts/BasicLayout.vue"),
  //   meta: { title: "系统管理" },
  //   children: [
  //     {
  //       path: "user",
  //       name: "User",
  //       component: () => import("@/views/system/user/index.vue"),
  //       meta: { title: "用户管理" }
  //     },
  //     {
  //       path: "role",
  //       name: "Role",
  //       component: () => import("@/views/system/role/index.vue"),
  //       meta: { title: "角色管理" }
  //     }
  //   ]
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫
router.beforeEach(async (to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - VNA-Admin`;
  }

  const userStore = useUserStore();
  const token = localStorage.getItem('token');

  // 不需要登录的页面
  if (to.path === '/login' || to.path === '/register' || to.path === '/demo' || to.path === '/promise-dialog') {
    if (token && userStore.isLoggedIn) {
      // 已登录，跳转到首页
      next('/dashboard');
    } else {
      next();
    }
    return;
  }

  // 需要登录的页面
  if (!token) {
    // 没有token，跳转到登录页
    next('/login');
    return;
  }

  // 有token但未加载用户信息
  if (!userStore.userInfo) {
    try {
      // 设置token到store
      userStore.setToken(token);

      // 获取用户信息并生成动态路由
      const userInfo = await userStore.getUserProfile();
      userStore.setUserInfo(userInfo);
      userStore.generateRoutes(userInfo.menus);

      // 重新导航到目标路由
      next({ ...to, replace: true });
    } catch (error) {
      console.error('获取用户信息失败:', error);
      // 获取用户信息失败，清除token并跳转到登录页
      userStore.clearUserInfo();
      next('/login');
    }
  } else {
    next();
  }
});

export { router };
export default router;