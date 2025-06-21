<script setup lang="ts">
defineOptions({
  name: "User",
});
import {  initForm } from "./settings";
import type { UserInfoDto,UserDto } from "@/types/modules/user.type"
import { listRole } from "@/api/role";
import { RoleDto } from "@/types/modules/role.type";
import { saveUser,listUser,deleteUser,infoUser } from "@/api/user";
import { message } from "ant-design-vue";

const userList = ref<UserInfoDto[]>([]);
const roleList = ref<RoleDto[]>([]);
const formData = ref<UserDto>({...initForm});
const formRef = ref();
const existingUser = computed(() => !formData.value.id);

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password:[
    { required: existingUser, message: '请输入密码', trigger: 'blur' },
  ]
})

function _init(){
  listUser().then(res=>{
    userList.value = res;
  })
}
function _infoUser(id: number){
  formRef.value.resetFields();
  infoUser(id).then(user=>{
    formData.value = user;
  })
}

function _reset(){
  formRef.value.resetFields();
  formData.value = {...initForm}
}

const onAdd = ()=>{
  formRef.value.validate().then(() => { 

    saveUser(formData.value).then(()=>{
      message.success('创建成功');
      _init()
    })
  })
}
const onEdit = (item:UserInfoDto)=>{
  if(item && item.id){
    _infoUser(item.id)
  }
}

_init()
</script>

<template>
    <y-page-layout title="角色管理" class="role-wrapper">
      <template #left>
        <a-list  size="small" :data-source="userList">
          <template #renderItem="{ item }">
            <a-list-item style="cursor: pointer;" @click="onEdit(item)">
              <p>
                <span>{{ item.username }}</span>
              </p>
            </a-list-item>
          </template>
        </a-list>
      </template>
      <template #toolbar>
        <a-space>
        <y-button type="primary" @click="_reset">重置</y-button>
        <y-button type="primary" @click="onAdd">添加</y-button>
      </a-space>
      </template>
      <a-form ref="formRef" :model="formData" layout="vertical" :rules="rules">
        <a-form-item name="username" label="用户名">
          <a-input v-model:value="formData.username" :disabled="!!formData.id"></a-input>
        </a-form-item>
        <a-form-item name="nickname" label="昵称">
          <a-input v-model:value="formData.nickname"></a-input>
        </a-form-item>
        <a-form-item v-if="!formData.id" name="password" label="密码">
          <a-input v-model:value="formData.password" type="password"></a-input>
        </a-form-item>
        <a-form-item name="roleIds" label="角色"> 
          <y-select v-model="formData.roleIds" api="/role/list" mode="multiple"></y-select>
        </a-form-item>
      </a-form>
      
    </y-page-layout>
</template>

<style scoped lang="scss">
.user-wrapper {}
</style>