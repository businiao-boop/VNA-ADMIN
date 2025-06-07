<script setup lang="ts">
import YConfigTable from '@/components/YConfigTable/index.vue'
import {columns ,presetFields} from "./settings";
import {useFormModal} from "@/hooks/modal";
import editModal from './editModal.vue';
import {saveMenu} from "@/api/menu"
import {MenuType} from "@/types/modules/menu.type";
const data = ref([
  {
    name:'菜单名称',
    path:'/home',
    icon:'home',
    type:'1',
    status:'1',
    createTime:'2022-01-01'
  }
])

function openModal(title="编辑菜单",row?:MenuType){
  const modalForm = row || {}
  const showModal = useFormModal({title,width:800})
  showModal<MenuType>(editModal,{modalValue:modalForm}).then((data)=>{
    saveMenu(data).then(res=>{
      console.log(res);
      
    })
  })
}
function handleEdit(row:MenuType){
  openModal("编辑菜单",row)
}
function handleDelete(row:any){}
function onAdd(){
  openModal("添加菜单",presetFields);
}
</script>
<template>
  <div class="menu-wrapper">
    <y-config-table :columns="columns" v-model="data" @add="onAdd">
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
