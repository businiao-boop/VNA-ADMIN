<template>
  <template v-if="hasChildren">
    <a-sub-menu :key="menuItem.path">
      <template #title>
        <span>
          <component v-if="menuItem.icon" :is="getIcon(menuItem.icon)" />
          <span>{{ menuItem.name }}</span>
        </span>
      </template>
      <MenuItem v-for="child in menuItem.children" :key="child.key || child.path" :menu-item="child" />
    </a-sub-menu>
  </template>
  <a-menu-item v-else :key="menuItem.path">
    <template #icon>
      <component v-if="menuItem.icon" :is="getIcon(menuItem.icon)" />
    </template>
    {{ menuItem.name }}
  </a-menu-item>
</template>

<script setup>
import { computed } from 'vue';
import * as icons from '@ant-design/icons-vue';

const props = defineProps({
  menuItem: {
    type: Object,
    required: true
  }
});

// 检查是否有子菜单
const hasChildren = computed(() => {
  return props.menuItem.children && props.menuItem.children.length > 0;
});

// 获取图标组件
const getIcon = (iconName) => {
  if (!iconName) return null;

  // 处理图标名称，确保兼容性
  let iconKey = iconName;
  if (!iconName.endsWith('Outlined') && !iconName.endsWith('Filled') && !iconName.endsWith('TwoTone')) {
    iconKey = iconName + 'Outlined';
  }

  return icons[iconKey] || icons[iconName] || null;
};
</script>