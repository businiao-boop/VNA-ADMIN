<script setup lang="ts">
defineOptions({
  name: "Role",
});
import {columns,presetFields} from "./settings";
import {useFormModal} from "@/hooks/modal";
import editModal from "./editModal.vue";
import { saveRole} from "@/api/role"
import { message } from "ant-design-vue";
import type { RoleType } from "@/types/modules/role.type";
import {listMenu} from "@/api/menu"
import type { MenuType } from "@/types/modules/menu.type";

const data = ref([]);

const menus  = ref<MenuType[]>([]);

(function loadData() { 
  listMenu().then(data=>{
    menus.value = data;
  })
})()

function openModal(modalForm:any) {
  const showModal = useFormModal();
  showModal<RoleType>(editModal,{modalValue:modalForm,menus}).then((data:RoleType)=>{
    saveRole(data).then(res=>{
      message.success('保存成功')
    })
  })
}
function onAdd() {
  openModal(presetFields);
}


</script>

<template>
  <y-page-layout title="角色管理" class="role-wrapper">
    <YConfigTable :columns="columns" v-model="data" @add="onAdd"></YConfigTable>
  </y-page-layout>
</template>

<style scoped lang="scss">
.role-wrapper {
  
}
</style>