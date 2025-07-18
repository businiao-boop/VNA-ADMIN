<script setup>

import { computed } from 'vue';
import { buildTree } from "@/utils/buildTree";
defineOptions({
  name: "y-tree",
});
const props = defineProps({
  treeData: {
    type: Array,
    default: () => [],
  },
  fieldNames: {
    type: Object,
    default: () => ({
      title: "menuName",
      key: "id",
      children: "children",
    }),
  },
  // 是否转换为树形结构
  transform:{
    type:Boolean,
    default:true,
  }
});

const data = computed(()=>{
  const {treeData,transform} = props;
  if(transform){
return     buildTree(treeData)
  }
  return treeData.map(item=>{
    return {
      ...item,
      title: item.name,
      key: item.id,
      children: item.children,
    }
  })
})


</script>

<template>
  <div class="y-tree-wrapper">
    <a-tree :tree-data="data"></a-tree>
  </div>
</template>

<style scoped lang="scss">
.y-tree-wrapper {
  
}
</style>