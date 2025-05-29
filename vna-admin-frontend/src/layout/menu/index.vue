<template>
  <a-menu
    mode="inline"
    :selectedKeys="[activeKey]"
    :openKeys="openKeys"
    @openChange="handleOpenChange"
  >
    <template v-for="item in menus" :key="item.path">
      <template v-if="!item.meta?.hidden">
        <a-sub-menu v-if="item.children?.length" :key="`submenu-${item.path}`">
          <template #title>
            <span>{{ item.meta?.title }}</span>
          </template>
          <menu-item :menus="item.children" />
        </a-sub-menu>

        <a-menu-item v-else :key="`menu-${item.path}`" @click="() => handleClick(item)">
          <menu-icon :icon="item.meta?.icon" />
          <span>{{ item.meta?.title }}</span>
        </a-menu-item>
      </template>
    </template>
  </a-menu>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { computed, defineProps, ref, watch } from "vue";
import type { RouteRecordRaw } from "vue-router";
import MenuItem from "./MenuItem.vue";
defineOptions({
  name: "Menu",
})
defineProps<{
  menus: RouteRecordRaw[];
}>();

const router = useRouter();
const route = useRoute();

const activeKey = computed(() => route.path);
const openKeys = ref<string[]>([]);

function handleClick(item: RouteRecordRaw) {
  if (item.path !== route.path) {
    router.push(item.path);
  }
}

function handleOpenChange(keys: string[]) {
  openKeys.value = keys;
}
</script>
