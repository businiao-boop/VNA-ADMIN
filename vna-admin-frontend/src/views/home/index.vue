<script setup lang="ts">
 import {listRelationRequestPermission} from "@/api/menu"
 import {MenuDto,MenuInfoDto,MenuTypeEnum,MenuTreeDto} from "@/types/modules/menu.type";
 const value = ref();
 const options = ref([
  {
    label: 'Option 1',
    value: 1,
  },
  {
    label: 'Option 2',
    value: 2,
  },
  {
    label: 'Option 3',
    value: 3,
  },
]);
const menuList = ref<MenuTreeDto[]>([])

 function listToTree<T>(list:any[]):T[] {
  const idKey =  'id'
  const parentKey =  'parentId'
  const childrenKey =  'children'

  const nodeMap = new Map()
  const tree:T[] = [];

  list.forEach(node => {
    // node[childrenKey] = []
    nodeMap.set(node[idKey], node)
  })

  list.forEach(node => {
    const parent = nodeMap.get(node[parentKey])
    if (parent) {
      if (!parent[childrenKey]) {
        parent[childrenKey] = []
      }
      parent[childrenKey].push(node)
    } else {
      tree.push(node)
    }
  })

  return tree
}

function getList() {
  listRelationRequestPermission().then(res => {
    // menuList.value = listToTree<MenuTreeDto>(res)
    menuList.value = res;
  })
}
// const normalizer = (node)=>{
//   return {
//     id: node.id,
//     label: node.menuName,
//     // children: node.children
//   }
// }
getList()
</script>
<template>
  <div class="home">
    <a-row :gutter="20">
      <a-col :span="12">
      </a-col>
      <a-col :span="12">
        <y-tree :options="menuList" rowKey="id" :transform="true" :expandLayer="1" checkable labelField="menuName" blockNode></y-tree>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="scss">
.home{
  width:500px;
  margin:100px auto;
}
</style>
