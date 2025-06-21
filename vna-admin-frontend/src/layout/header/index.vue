<script setup lang="ts">
defineOptions({
  name: "Header",
});
import Menu from "../menu/index.vue";

import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import ThemeDrawer from "@/layout/themeDrawer/index.vue"
import type { MenuProps } from 'ant-design-vue';
import  {GenderEnum} from '@/types/enum.type'

const userStore = useUserStore();
const router = useRouter();
const open = ref(false);

const onMenuClick: MenuProps['onClick'] = ({key})=>{
  switch (key) {
    case 'settings':
      open.value = true;
      break;
    case 'personal':
      break;
    case 'logout':
      userStore.logout().then(()=>{
        router.push('/login')
      });
      break;
  
    default:
      break;
  }
}

const userInfo = computed(() => {
  return userStore.userInfo;
});

</script>
<template>
  <div class="header">
    <Menu :menus="userStore.routes" />
    <ul class="header-right">
      <li class="right-item">
        <a-dropdown placement="bottomRight" arrow>
          <template v-if="userInfo?.avatar">
            <a-avatar class="avatar" size="large" :src="userInfo.avatar">
            </a-avatar>
          </template>
          <template v-else>
            <a-avatar class="avatar" size="large">
              <template #icon>
                <YIcon v-if="userInfo?.gender === GenderEnum.MALE" svg="boyAvatar"></YIcon>
                <YIcon v-else-if="userInfo?.gender === GenderEnum.FEMALE" svg="girlAvatar"></YIcon>
                <YIcon v-else svg="userAvatar"></YIcon>
              </template>
            </a-avatar>
          </template>
        <template #overlay>
          <a-menu @click="onMenuClick" style="width: 150px;">
            <a-menu-item key="personal">
              <y-icon icon="icon-haoyou"></y-icon>
              个人中心
            </a-menu-item>
            <a-menu-item key="settings">
              <y-icon icon="icon-shezhi"></y-icon>
              主题设置
            </a-menu-item>
            <a-menu-item key="logout">
              <y-icon icon="icon-tuichu"></y-icon>
              退出登录
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      </li>
      <ThemeDrawer v-model="open"></ThemeDrawer>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.header{
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .header-right{
        line-height: normal;
        display: flex;
        align-items: center;
        .right-item{
          margin-left: 10px;
          .avatar{
            cursor: pointer;
          }
        }
      }
    }
</style>
