<template>
  <a-menu
    mode="horizontal"
    v-model:selectedKeys="activeKey"
    v-model:openKeys="openKeys"
    @click="handleClick"
    triggerSubMenuAction="click"
  >
  <menu-item :menus="sidebar" />
  </a-menu>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { computed, defineProps, ref, watch } from "vue";
import type { RouteRecordRaw } from "vue-router";
import MenuItem from "./MenuItem.vue";
import type { MenuInfo } from 'ant-design-vue/es/menu/src/interface';
import { Layout } from "ant-design-vue";
import { LayoutEnum } from "@/types/enum.type";
defineOptions({
  name: "Menu",
})
const props = defineProps<{
  menus: RouteRecordRaw[];
}>();

const router = useRouter();
const route = useRoute();


const sidebar = computed<RouteRecordRaw[]>(() => {
  return props.menus.flatMap(t=>{
    if(t.path=="/"){
      const child = t.children ? t.children[0] : t
      return {...child}
    }else if(t.name == LayoutEnum.DEFAULT || t.name == LayoutEnum.MOBILE || t.name == LayoutEnum.FULLPAGE){
      if(t.children){
        return t.children.map(x=>{return {...x,path:`${t.path}/${x.path}`}})
      }
    }else{
      return {...t}
    }
  }).filter(t=>!!t)
});

const activeKey = ref([route.path.split("/").at(-1)]);// 当前激活的菜单
watchEffect(() => {  
  if(route.path=="/"){
    activeKey.value = [route.path];
  }else{
    activeKey.value = [route.path.split("/").at(-1)]
  }
  
});

const openKeys = ref<string[]>([]);//  当前展开的 SubMenu 菜单项 key 数组

function handleClick(item:MenuInfo) {
  if(!item.keyPath)return;
  
  const keyPath = item.keyPath.join("/");
  
  if (keyPath !== route.path) {
    router.push(keyPath);
  }
}

</script>
