<script setup lang="ts">
import YConfigTable from '@/components/YConfigTable/index.vue'
import {columns ,presetFields} from "./settings";
import {useFormModal} from "@/hooks/modal";
import editModal from './editModal.vue';
import {saveMenu,listMenu} from "@/api/menu"
import {listPer} from "@/api/permission";
import {MenuType} from "@/types/modules/menu.type";
import { message } from 'ant-design-vue';
import {PermissionType} from "@/types/modules/permission.type";
const menuList = ref<MenuType[]>([])
const permissionList = ref<PermissionType[]>([])
function init(){
  listMenu().then(res=>{
    if(res){
      menuList.value = res
    }
  })
  listPer().then(res=>{
    if(res){
      permissionList.value = res
    }
  })
}
init();

function openModal(row?:MenuType){
  const modalForm = row || {}
  const showModal = useFormModal()
  showModal<MenuType>(editModal,{modalValue:modalForm,permissionList:permissionList.value}).then((data)=>{
    saveMenu(data).then(res=>{
      message.success('保存成功')
    })
  })
}
function handleEdit(row:MenuType){
  openModal(row)
}
function handleDelete(row:any){}
function onAdd(){
  openModal(presetFields);
}
</script>
<template>
  <div class="menu-wrapper">
    <y-config-table :columns="columns" v-model="menuList" @add="onAdd">
      <template #action="{row}">
        <div class="action-wrapper">
          <y-button type="primary" size="small" @click="handleEdit(row)">编辑</y-button>
          <y-button type="danger" size="small" @click="handleDelete(row)">删除</y-button>
        </div>
      </template>
    </y-config-table>
  </div>
</template>

<style scoped lang="scss">
.menu-wrapper { 
  .action-wrapper { 
    .y-button{
      margin-right: 5px;
    }
  }
}
</style>
