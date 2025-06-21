<script setup lang="ts">
defineOptions({
  name: "Permission",
});
import {savePermission,listPermission,infoPermission} from "@/api/permission";
import { PermissionDto } from "@/types/modules/permission.type";
import {initForm} from "./settings"
import { message } from "ant-design-vue";

const options = ref<PermissionDto[]>([]);
const formData = ref<PermissionDto>({...initForm});
const formRef = ref();
const rules = ref({
  code: [
    {
      required: true,
      message: "请输入权限标识",
    },
  ],
  name: [
    {
      required: true,
      message: "请输入权限名称",
    },
  ],
});

function list(){
  listPermission().then(res=>{
    options.value = res;
  })
}
list()
function _reset(){
  formData.value = {...initForm};
  formRef.value.resetFields();
}
const onAdd = ()=>{
  formRef.value.validate().then(()=>{
    savePermission(formData.value).then((res)=>{
      console.log(res,"res");
      message.success('保存成功');
      list();
      _reset()
    })
  })
}
const onEdit = (item:PermissionDto)=>{
  if(item && item.id){
    infoPermission(item.id).then(res=>{
      formData.value = res;
    })
  }
}
</script>

<template>
  <y-page-layout mode="horizontal" class="permission-wrapper">
    <template #left>
      <a-list  size="small" :data-source="options">
          <template #renderItem="{ item }">
            <a-list-item style="cursor: pointer;" @click="onEdit(item)">
              <p>
                <span>{{ item.name }}</span>
              </p>
            </a-list-item>
          </template>
        </a-list>
      <!-- <y-tree :options="options"></y-tree> -->
    </template>
    <template #toolbar>
      <a-space>
        <y-button type="primary" @click="_reset">重置</y-button>
        <y-button type="primary" @click="onAdd">添加</y-button>
      </a-space>
    </template>
    <a-form ref="formRef" :model="formData" layout="vertical" :rules="rules">
      <a-form-item name="code" label="权限标识">
        <a-input v-model:value="formData.code" :disabled="!!formData.id"></a-input>
      </a-form-item>
      <a-form-item name="name" label="权限名称">
        <a-input v-model:value="formData.name"></a-input>
      </a-form-item>
      <a-form-item name="description" label="权限描述">
        <a-input v-model:value="formData.description"></a-input>
      </a-form-item>
    </a-form>
  </y-page-layout>
</template>

<style scoped lang="scss">
.permission-wrapper {
  
}
</style>