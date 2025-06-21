<template>
  <template v-for="item in menus" :key="item.path">
    <template v-if="!item.meta?.hidden">
      <template v-if="item.children?.length">
        <a-sub-menu :key="`${item.path}`">
          <template #title>
            <span>{{ item.meta?.menuName }}</span>
          </template>
          <menu-item :menus="item.children"  />
        </a-sub-menu>
      </template>
      <template v-else> 
        <a-menu-item
          :key="`${item.path}`"
        >
          <span>{{ item.meta?.menuName }}</span>
        </a-menu-item>

      </template>

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

</script>
