<script setup lang="ts">
import YConfigTable from '@/components/YConfigTable/index.vue'
const columns = [
  {
    title:'菜单名称',
    field:"name",
    visible:true

  },
  {
    title:'菜单路径',
    field:"path",
    visible:true
  },
  {
    title:'菜单图标',
    field:"icon",
    visible:true
  },
  {
    title:'菜单类型',
    field:"type",
    visible:true
  },
  {
    title:'菜单状态',
    field:"status",
    visible:true
  },
  {
    title:'创建时间',
    field:"createTime",
    visible:true
  },
  {
    title:'操作',
    field:"action",
    visible:true
  }
]
const data = ref([
  {
    name:'菜单名称',
    path:'/home',
    icon:'home',
    type:'1',
    status:'1',
    createTime:'2022-01-01',
    action:'编辑 删除'
  }
])
</script>
<template>
  <div class="menu-wrapper">
    <y-config-table :columns="columns" v-model="data"></y-config-table>
  </div>
</template>

<style scoped lang="scss"></style>
