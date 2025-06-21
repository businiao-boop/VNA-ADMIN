<script setup lang="ts">
defineOptions({
  name: "LayoutTabs",
});
import { useRouter} from 'vue-router';
import { useTabsStore } from '@/stores/sidebar';
import { watch } from 'vue';

import type { TabType } from '@/types/router';

const router = useRouter();
const tabsStore = useTabsStore();

watch(() => router.currentRoute.value,
  route => {

    if (route.meta?.menuName) {
      tabsStore.addTab({...route});
    }
  },
  { immediate: true }
);
function handleClick(route:TabType){
  if(route.path !== router.currentRoute.value.path){
    router.push(route.path);
  }
}
function handleClose(route:TabType){
  // const tab = tabsStore.removeTab(route.fullPath);
  const tabs = tabsStore.tabs;
  const idx = tabs.findIndex(t => t.fullPath === route.fullPath);
  
  // 优先跳到左边 tab，没有就右边，再没有就回首页
  const nextTab = tabs[idx - 1] || tabs[idx + 1] || tabs[0];

  if(nextTab){
    router.push({...nextTab,replace:true});
  }
  tabsStore.removeTab(route.fullPath);
  
}
</script>

<template>
  <div class="layout-tabs-wrapper">
    <div class="layout-tab-pane" :class="{active:item.fullPath == router.currentRoute.value.fullPath}" v-for="item in tabsStore.tabs" :key="item.path" @click="handleClick(item)">
      <span></span>
      <span class="title">
        {{ item.meta.menuName }}
      </span>
      <y-icon v-show="item.fullPath!='/'" icon="icon-close" @click="handleClose(item)"></y-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>