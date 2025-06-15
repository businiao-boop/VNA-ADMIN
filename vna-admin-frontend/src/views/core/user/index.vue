<script setup lang="ts">
defineOptions({
  name: "User",
});
import { columns, presetFields } from "./settings";
import { useFormModal } from "@/hooks/modal";
import editModal from "./editModal.vue";
import type { UserType } from "@/types/modules/user.type"
import { listRole } from "@/api/role";
import { RoleTypeDto } from "@/types/modules/role.type";
import { saveUser,listUser,deleteUser } from "@/api/user";
import { message } from "ant-design-vue";

const userList = ref<UserType[]>([]);
const roleList = ref<RoleTypeDto[]>([]);
function openModal(modalForm: UserType) {
  const showModal = useFormModal();
  showModal<UserType>(editModal, { modalValue: modalForm, roleList: roleList.value }).then((data: UserType) => {
    if (data) {
      saveUser(data).then(() => {
        message.success('保存成功');
        initUserList()
      })
    }
  })
}
function onAdd() {
  openModal(presetFields);
}
function handleEdit(row: UserType) {
  openModal(row);
}
function handleDelete(id:number){
  deleteUser(id).then(()=>{
    message.success('删除成功');
  })
}
function initUserList(){
  listUser().then(res=>{
    userList.value = res;
  })
}

(() => {
  listRole().then(res => {
    roleList.value = res;
  })
  initUserList()
})()
</script>

<template>
  <div class="user-wrapper">
    <y-page-layout title="角色管理" class="role-wrapper">
      <YConfigTable :columns="columns" v-model="userList" @add="onAdd">
      
        <template #action="{row}">
        <div class="action-wrapper">
          <y-button type="primary" size="small" @click="handleEdit(row)">编辑</y-button>
          <y-button type="danger" size="small" @click="handleDelete(row.id)">删除</y-button>
        </div>
      </template>
      </YConfigTable>
    </y-page-layout>
  </div>
</template>

<style scoped lang="scss">
.user-wrapper {}
</style>