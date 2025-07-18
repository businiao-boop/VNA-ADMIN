<script setup>
defineOptions({
  name: "Role",
});

import {listRole,listMenu} from "@/api";

const gData = ref([]);
const roleList = ref([]);
const menuList = ref([]);
function initData() {
  Promise.all([listMenu({
    status:1
  }),listRole()]).then(([menus,roles]) => {
    roleList.value = roles;
    menuList.value = menus;
  })
}
initData()
</script>

<template>
  <y-wrapper>
    <template #left>
      <a-list size="small" :data-source="roleList">
      <template #renderItem="{ item }">
        <a-list-item>{{ item.id }}</a-list-item>
      </template>
    </a-list>
    </template>
    <y-tree :treeData="menuList" label="menuName"></y-tree>
    </y-wrapper>
</template>

<style scoped lang="scss">
.role-wrapper {
  
}
</style>