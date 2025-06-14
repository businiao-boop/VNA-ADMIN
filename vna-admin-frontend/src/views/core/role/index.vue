<script setup lang="ts">
defineOptions({
  name: "Role",
});
import {columns,presetFields} from "./settings";
import {useFormModal} from "@/hooks/modal";
import editModal from "./editModal.vue";
import { saveRole,listRole} from "@/api/role"
import { message } from "ant-design-vue";
import type { RoleType } from "@/types/modules/role.type";
import type { MenuType } from "@/types/modules/menu.type";
import {listMenu} from "@/api/menu"

const roleList = ref<RoleType[]>([]);

const menus  = ref<MenuType[]>([]);

(function loadData() { 
  listMenu().then(data=>{
    menus.value = data;
  })
})()
function initRoleList(){
  listRole().then(res=>{
    if(res){
      roleList.value = res.roles;
    }
  })
}
initRoleList();

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
const formData = ref({...presetFields})
const rules = {
  name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
  code: [{ required: true, message: "请输入角色名称", trigger: "blur" }],

}
const checkedKeys = ref([])

</script>

<template>
  <y-page-layout mode="horizontal" class="role-wrapper">
    <template #left>
      <p v-for="item in roleList" :key="item.id" >{{ item.name }}</p>
    </template>
    <a-form ref="formRef" :model="formData" layout="vertical" :rules="rules">
      <a-form-item label="唯一标识" name="code">
        <a-input v-model:value="formData.code" placeholder="请输入角色名称" />
      </a-form-item>
      <a-form-item label="角色名称" name="name">
        <a-input v-model:value="formData.name" placeholder="请输入角色名称" />
      </a-form-item>
      <a-form-item label="角色描述" name="remark">
        <a-input v-model:value="formData.remark" />
      </a-form-item>
      <a-form-item label="菜单">
        <y-tree :treeData="menus" checkable v-model:checkedKeys="checkedKeys" :expandLayer="1" title="menuName" rowKey="id"></y-tree>
      </a-form-item>
    </a-form>
  </y-page-layout>
</template>

<style scoped lang="scss">
.role-wrapper {
  
}
</style>