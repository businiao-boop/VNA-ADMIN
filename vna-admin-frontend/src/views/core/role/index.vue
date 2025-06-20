<script setup lang="ts">
defineOptions({
  name: "Role",
});
import {presetFields} from "./settings";
import {useFormModal} from "@/hooks/modal";
import editModal from "./editModal.vue";
import { saveRole,listRole,infoRole} from "@/api/role"
import { message } from "ant-design-vue";
import type { RoleTypeDto,RoleInfoDto,RoleListDto } from "@/types/modules/role.type";
import type { MenuInfoDto,MenuTreeDto } from "@/types/modules/menu.type";
import {listRelationRequestPermission} from "@/api/menu"

const roleList = ref<RoleListDto[]>([]);

const menuTreeList  = ref<MenuInfoDto[]>([]);
const formRef = ref();

(function loadData() { 
  listRelationRequestPermission().then(data=>{
    if(data){
      menuTreeList.value = data
    }
  })
})()
function initRoleList(){
  listRole().then(res=>{
    if(res){
      roleList.value = res;
    }
  })
}
initRoleList();

function openModal(modalForm:any) {
  // const showModal = useFormModal();
  // showModal<RoleTypeDto>(editModal,{modalValue:modalForm,menus}).then((data:RoleTypeDto)=>{
  //   saveRole(data).then(res=>{
  //     message.success('保存成功')
  //   })
  // })
}

const formData = ref<RoleInfoDto>({...presetFields })
const rules = {
  name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
  code: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
}
const onClickItem = (item: RoleTypeDto) => {
  if(item && item.id){
    infoRole(item.id).then(res=>{
      if(res){
        formData.value = res;
      }
    })
  }
};
const onEditTree = (tree: MenuInfoDto)=>{

}
function onAdd() {
  formRef.value.validate().then(() => { 
    saveRole(formData.value).then((res)=>{
      if(res){
        formData.value = res;
        message.success('保存成功');
      }
    })
  })

}

</script>

<template>
  <y-page-layout mode="horizontal" class="role-wrapper">
    <template #left>
      <h3 class="role-list-title">权限列表</h3>
      <ul class="role-list">
        <li v-for="item in roleList" :key="item.id" @click="onClickItem(item)">
        <span title="name">{{ item.name }}</span>
      </li>
      </ul>
    </template>
    <template #toolbar>
      <a-space>
        <y-button type="primary" @click="onAdd">添加</y-button>
      </a-space>
    </template>
    <a-form ref="formRef" :model="formData" layout="vertical" :rules="rules">
      <a-form-item label="唯一标识" name="code">
        <a-input :disabled="(!!formData.id)" v-model:value="formData.code" placeholder="请输入角色名称" />
      </a-form-item>
      <a-form-item label="角色名称" name="name">
        <a-input v-model:value="formData.name" placeholder="请输入角色名称" />
      </a-form-item>
      <a-form-item label="角色描述" name="description">
        <a-input v-model:value="formData.description" />
      </a-form-item>
      <a-form-item label="菜单">
        <y-tree :treeData="menuTreeList" checkable v-model:checkedKeys="formData.menuIds" blockNode :expandLayer="1" rowKey="id">
          <template #title="{item}">
            <div class="tree-item">
              <span>
                {{ item.menuName }}
              </span>
              <div class="tree-item-toolbar">
                <y-icon @click="onEditTree(item)" icon="icon-31shezhi"></y-icon>
              </div>
            </div>
          </template>
        </y-tree>
      </a-form-item>
    </a-form>
  </y-page-layout>
</template>

<style scoped lang="scss">
.role-wrapper {
  .role-list-title{
    padding-bottom: 20px;
  }
  .role-list{
    li{
      cursor: pointer;
      padding: 5px;
    }
    li:hover{
      background-color: #f5f7fa;
    }
  }
  .y-tree{
    
    .tree-item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 10px;
      .tree-item-toolbar{
        height: 100%;
        font-size: 22px;
        display: none;
        .iconfont{
          transition: all .3s;
          &:hover{
            transform: scale(1.1);
          }
        }
      }
      &:hover{
        .tree-item-toolbar{
          display: block;
        }
      }
    }
    .ant-tree-node-selected{
      .tree-item{
        &-toolbar{
          display: block;
        }
      } 
    }
  }
}
</style>