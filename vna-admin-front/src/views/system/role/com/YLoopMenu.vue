<script setup>

defineOptions({
  name: "YLoopMenu",
});
import YCollapsePanel from "./YCollapsePanel.vue"
const props = defineProps({
  menus: {
    type: Array,
    default: () => ([])
  }
});
const activeKey = ref([]);
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

const isOpen = (key) => {
  return activeKey.value.includes(key);
}
</script>

<template>
  <a-collapse :activeKey="activeKey" expand-icon-position="end" :bordered="true" @change="handleChange">
    <YCollapsePanel v-for="menu in menus" :key="menu.id" :menu="menu" :rowKey="menu.id + ''" :openKeys="activeKey">
    </YCollapsePanel>
    <!-- <a-collapse-panel v-for="menu in menus" :key="menu.id" :show-arrow="false">
      <template v-if="hasChild(menu)">
        <YLoopMenu :menus="menu.children"></YLoopMenu>
      </template>
      <template #header>
        <div class="flex flex-1 justify-between">
          <div class="left">
            <span v-if="hasChild(menu)">
              <i class="fas text-indigo-500 mr-2" :class="[isOpen(menu.id) ? 'fa-folder-open' : 'fa-folder']"></i>
            </span>
            <span v-else>
              <i class="fas fa-folder text-blue-400 mr-2"></i>
            </span>
            {{ menu.title }}
          </div>
          <div class="right">
            <template v-if="!hasChild(menu)">
              <a-checkbox-group v-model:value="selectedPermissions" :options="permissions"></a-checkbox-group>
            </template>
            <template v-else>
              <i class="fas fa-chevron-right text-gray-400"></i>
            </template>
          </div>
        </div>
      </template>
    </a-collapse-panel> -->
  </a-collapse>
</template>

<style scoped lang="scss">
.compoent-wrapper {}
</style>