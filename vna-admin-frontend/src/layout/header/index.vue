<script setup lang="ts">
defineOptions({
  name: "Header",
});
import Menu from "../menu/index.vue";
import LockPasswordModal from "@/layout/lockScreen/lockPasswordModal.vue"

import { useUserStore } from "@/stores/user";
import { useTabsStore } from "@/stores/sidebar";
import { useRouter } from "vue-router";
import { useFormModal } from "@/hooks/modal";
import ThemeDrawer from "@/layout/themeDrawer/index.vue"
import {useFullscreen} from "@/hooks/useFullScreen"
import type { MenuProps } from 'ant-design-vue';
import  {GenderEnum} from '@/types/enum.type'

const userStore = useUserStore();
const tabsStore = useTabsStore();
const router = useRouter();
const open = ref(false);

const onMenuClick: MenuProps['onClick'] = ({key})=>{
  switch (key) {
    case 'settings':
      open.value = true;
      break;
    case 'personal':
    router.push('/settings/personal')
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

const onRefreshView = ()=>{
  tabsStore.refreshView();
}


const {isFullscreen, toggle} = useFullscreen();

const onLocak = ()=>{
  const showModal = useFormModal();
  showModal(LockPasswordModal).then((data:any)=>{
    console.log(data,"data");
    
    if(data && data.lockPassword){
      userStore.lockScreen(data.lockPassword);
    }
  })

}

</script>
<template>
  <div class="header">
    <Menu :menus="userStore.routes" />
    <ul class="header-right">
      <li class="right-item">
        <y-icon class="shakeHover" icon="icon-mima" :size="18" @click="onLocak"></y-icon>
      </li>
      <li class="right-item">
        <y-icon class="full-screen scaleHover   " :icon="isFullscreen ? 'icon-full-screen-cancel' : 'icon-full-screen-one'" @click="toggle" :size="18"></y-icon>
      </li>
      <li class="right-item">
        <y-icon class="hover-spin-once" @click="onRefreshView" icon="icon-shuaxin" :size="18"></y-icon>
      </li>
      
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
          margin-left: 20px;
          .refresh{
            transition: all .8s;
            &:hover{
              transform: rotate(180deg);
            }
          }
          .avatar{
            cursor: pointer;
          }
        }
      }
    }
</style>
