<script setup>
import { computed } from 'vue';

defineOptions({
  name: "YLoopMenu",
});
const props = defineProps({
  menus: {
    type: Array,
    default: () => ([])
  }
});
const activeKey = ref('1');
const selectedPermissions = ref([]);

const permissions = [
  {
    value: 'read',
    label: '读取'
  },
  {
    value: 'write',
    label: '写入'
  }
]

const hasChild = (menu) => {
  return menu.children && menu.children.length > 0;
}

</script>

<template>
  <a-collapse v-model:activeKey="activeKey" expand-icon-position="end" :bordered="true">
    <a-collapse-panel v-for="menu in menus" :key="menu.id">
      <template v-if="hasChild(menu)">
        <YLoopMenu :menus="menu.children"></YLoopMenu>
      </template>
      <template v-else>
        <a-checkbox-group v-model:value="selectedPermissions" :options="permissions"></a-checkbox-group>
      </template>
      <template #header>
        <FileOutlined />
        {{ menu.title }}
      </template>
    </a-collapse-panel>
  </a-collapse>
</template>

<style scoped lang="scss">
.compoent-wrapper {}
</style>