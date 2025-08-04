<script setup>
import { computed } from 'vue';
import YLoopMenu from "./YLoopMenu.vue"
defineOptions({
  name: "YCollapsePanel",
});
const props = defineProps({
  menu: {
    type: Object,
    default: () => ({})
  },
  rowKey: {
    type: String,
    default: ''
  },
  openKeys: {
    type: Array,
    default: () => ([])
  }
});
const permissions = [
  {
    value: 'read',
    label: '读取'
  },
  {
    value: 'write',
    label: '写入'
  }
];
const selectedPermissions = ref([]);
const hasChild = computed(() => {
  return props.menu.children && props.menu.children.length > 0;
})
const isOpen = computed(() => {
  return props.openKeys.includes(props.rowKey);
})
</script>

<template>
  <a-collapse-panel class="y-collapse-panel" :key="rowKey" :show-arrow="false"
    :class="[hasChild ? 'cursor-pointer' : 'cursor-default']">
    <template v-if="hasChild">
      <YLoopMenu :menus="menu.children"></YLoopMenu>
    </template>
    <template #header>
      <!-- fa-folder -->
      <div class="flex flex-1 justify-between">
        <div class="left">
          <span v-if="hasChild">
            <i class="fas text-indigo-500 mr-2" :class="[isOpen ? 'fa-folder-open' : 'fa-folder']"></i>
          </span>
          <span v-else>
            <i class="fas fa-file-alt text-green-400 mr-2"></i>
          </span>
          {{ menu.title }}
        </div>
        <div class="right">
          <template v-if="!hasChild">
            <a-checkbox-group v-model:value="menu.permissions" :options="permissions"></a-checkbox-group>
          </template>
          <template v-else>
            <i class="fas  text-gray-400 fa-chevron-right transition-all"
              :class="[isOpen ? ' rotate-[-90deg]' : '']"></i>
          </template>
        </div>
      </div>
    </template>
  </a-collapse-panel>
</template>

<style scoped lang="scss">
.y-collapse-panel {
  :deep(.ant-collapse-header) {
    cursor: inherit;
  }
}
</style>