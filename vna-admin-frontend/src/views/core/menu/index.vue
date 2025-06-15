<script setup lang="ts">
import { message } from 'ant-design-vue';
import {presetFields} from "./settings";
import {useFormModal} from "@/hooks/modal";
import editModal from './editModal.vue';
import {saveMenu,listMenu,infoMenu} from "@/api/menu"
import {MenuDto,MenuInfoDto,MenuTypeEnum,MenuTreeDto} from "@/types/modules/menu.type";
import { Modal } from 'ant-design-vue';
const menuTree = ref<MenuInfoDto[]>([])
const formRef = ref();

const formData = ref<MenuDto>({...presetFields});

  const isMenuType = computed(() => formData.value.type === MenuTypeEnum.MENU);
  const rules = {
  menuName: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
  path: [{ required: true, message: "请输入菜单路径", trigger: "blur" }],
  routerName: [{ required: true, message: "请输入菜单路由名称", trigger: "blur" }],
  component: [{ required: isMenuType, message: "请输入菜单组件", trigger: "blur" }]
}
function init(){
  listMenu().then(res=>{
    if(res){
      menuTree.value = res
    }
  })
}
init();

function openModal(row?:MenuDto){
  const modalForm = row || {}
  const showModal = useFormModal()
  showModal<MenuDto>(editModal,{modalValue:modalForm}).then((data)=>{
    saveMenu(data).then(res=>{
      message.success('保存成功')
    })
  })
}
function handleEdit(row:MenuInfoDto){
  openModal(row)
}
function onDelMenu(row:any){
  const confirm = () => {
    Modal.confirm({
      title: 'Confirm',
      icon:"",
      content: 'Bla bla ...',
      okText: '确认',
      cancelText: '取消',
      onOk(){
      }
    });
  };
  confirm()
} 
function onAdd(){
  formRef.value.validate().then(() => {
    saveMenu(formData.value).then(()=>{
      message.success('创建成功');
    })
  })
}
function reset(){
  formRef.value.resetFields()
}
function onClickTree(tree:MenuTreeDto){
  if(tree.parentId === null){
    formData.value.parentId = tree.id;
    return;
  }
  if(tree.children && tree.children.length > 0)return;

  infoMenu(tree.id).then(res=>{
    if(res){
      formData.value = res;
    }
  })
}
</script>
<template>
  <y-page-layout mode="horizontal" class="menu-wrapper">
    <template #left>
      <y-tree :treeData="menuTree" @select="onClickTree" rowKey="id" titleKey="menuName" blockNode></y-tree>
    </template>
    <template #toolbar>
      <a-space warp>
        <a-button type="primary" @click="reset">清空</a-button>
        <a-button type="primary" @click="onAdd">创建</a-button>
        <a-button type="danger" @click="onDelMenu">删除</a-button>
      </a-space>
    </template>
    <a-form ref="formRef" :model="formData" layout="vertical" class="menu-form" :rules="rules">
      <!-- 🥇 高优先级：name、path -->
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="父级菜单 ID" name="parentId">
            <a-input-number v-model:value="formData.parentId" placeholder="0 为顶级菜单" style="width: 100%" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="菜单名称" name="menuName">
            <a-input v-model:value="formData.menuName" placeholder="请输入菜单名称" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="路由名称" name="routerName">
            <a-input :disabled="formData.id" v-model:value="formData.routerName" placeholder="路由名称，必须要和组件name一致" style="width: 100%" />
          </a-form-item>
        </a-col>
      </a-row>

      <!-- 🥈 中优先级：component、type、parentId -->
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="菜单类型" name="type">
            <y-select-enum v-model="formData.type" enum="menuTypeEnum"></y-select-enum>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="路径" name="path">
            <a-input v-model:value="formData.path" placeholder="请输入路由路径" />
          </a-form-item>

        </a-col>
      </a-row>

      <!-- 🥈 中优先级：component（仅菜单类型时显示） -->
      <a-form-item v-if="isMenuType" label="组件路径" name="component">
        <a-input v-model:value="formData.component" placeholder="views/xxx/index.vue" />
      </a-form-item>

      <!-- 🥉 中优先级：sort、icon、layout -->
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="图标" name="icon">
            <a-input v-model:value="formData.icon" placeholder="Ant Icon 名称" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="排序" name="sort">
            <a-input-number v-model:value="formData.sort" placeholder="越小越靠前" style="width: 100%" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="布局类型" name="layout">
            <y-select-enum v-model="formData.layout" enum="layoutEnum"></y-select-enum>
          </a-form-item>
        </a-col>
        <a-col :span="12" v-if="isMenuType">
          <a-form-item label="权限标识" name="permissionIds">
            <y-select mode="multiple" v-model="formData.permissionIds" api="/permission/list">
            </y-select>
          </a-form-item>
        </a-col>
      </a-row>

      <!-- ⭐ 次优先级：show、keepAlive、isExternal -->
      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-item label="是否显示" name="show">
            <a-switch v-model:checked="formData.show" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="是否缓存" name="keepAlive">
            <a-switch v-model:checked="formData.keepAlive" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="外链菜单" name="isExternal">
            <a-switch v-model:checked="formData.isExternal" />
          </a-form-item>
        </a-col>
      </a-row>

      <!-- ❓ 可选字段：externalLink、permission -->
      <a-form-item v-if="formData.isExternal" label="外链地址" name="externalLink">
        <a-input v-model:value="formData.externalLink" placeholder="https://example.com" />
      </a-form-item>
    </a-form>
  </y-page-layout>
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
