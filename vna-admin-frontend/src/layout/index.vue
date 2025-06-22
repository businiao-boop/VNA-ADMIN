<script setup lang="ts">
defineOptions({
  name: "Layout",
});
import Header from "./header/index.vue";
import LayoutTabs from "./tabs/index.vue";
import LockSceeen from "./lockScreen/index.vue"
import { useTabsStore } from "@/stores/sidebar";
import { useUserStore } from "@/stores/user";
const tabsStore = useTabsStore();
const userStore = useUserStore();
onMounted(() => {
  useUserStore().checkLockStatus()
})
</script>
<template>
  <a-layout class="layout-wrapper">
    <a-layout-header class="layout-header"><Header /></a-layout-header>
    <LayoutTabs></LayoutTabs>
    <a-layout-content class="layout-content">
      <div class="layout-content-wrapper">
        <router-view :key="tabsStore.reloadKey" />
      </div>
    </a-layout-content>
    <a-layout-footer class="layout-footer">© 2025 VNA ADMIN</a-layout-footer>
  </a-layout>
  <LockSceeen v-if="userStore.isLocked"></LockSceeen>
</template>

<style lang="scss">
@import url("./layou.scss");
</style>
