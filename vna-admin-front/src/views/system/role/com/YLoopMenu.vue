<script setup>

defineOptions({
  name: "YLoopMenu",
});
import YCollapsePanel from "./YCollapsePanel.vue"
const props = defineProps({
  menus: {
    type: Array,
    default: () => ([])
  },
  permissions: {
    type: Array,
    default: () => ([])
  },
});
const activeKey = ref([]);

const hasChild = (menu) => {
  return menu.children && menu.children.length > 0;
}
const handleChange = (keys) => {
  if (keys.length === 0) {
    activeKey.value = [];
    return;
  }
  const { menus } = props;
  const lastKey = keys.at(-1);
  const menu = menus.find(item => item.id === +lastKey);
  if (hasChild(menu)) {
    activeKey.value = keys;
  }
}

</script>

<template>
  <a-collapse :activeKey="activeKey" expand-icon-position="end" :bordered="true" @change="handleChange">
    <YCollapsePanel v-for="menu in menus" :key="menu.id" :menu="menu" :rowKey="menu.id + ''" :openKeys="activeKey"
      :permissions="permissions">
    </YCollapsePanel>
  </a-collapse>
</template>

<style scoped lang="scss">
.compoent-wrapper {}
</style>