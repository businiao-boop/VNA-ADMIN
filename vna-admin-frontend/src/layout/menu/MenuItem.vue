<template>
  <template v-for="item in menus" :key="item.path">
    <template v-if="!item.meta?.hidden">
      <a-sub-menu v-if="item.children?.length" :key="`submenu-${item.path}`">
        <template #title>
          <span>{{ item.meta?.title }}</span>
        </template>
        <menu-item :menus="item.children" />
      </a-sub-menu>

      <a-menu-item
        v-else
        :key="`menu-${item.path}`"
        @click="() => handleClick(item)"
      >
        <menu-icon :icon="item.meta?.icon" />
        <span>{{ item.meta?.title }}</span>
      </a-menu-item>
    </template>
  </template>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
defineOptions({
  name: "MenuItem",
});
defineProps<{
  menus: RouteRecordRaw[];
}>();

const router = useRouter();
const route = useRoute();

function handleClick(item: RouteRecordRaw) {
  if (item.path !== route.path) {
    router.push(item.path);
  }
}
</script>
