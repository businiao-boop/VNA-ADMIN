<script setup lang="ts">
defineOptions({
  name: "YTree",
});
import {buildTree} from "@/utils/buildTree";
const props = withDefaults(defineProps<{
  options:Object[];
  transform?:boolean;//是否转换成树结构
  expandLayer?:number;//展开层级,Infinity为展开所有
  blockNode?:boolean;//是否节点占据一行
  rowField?:string;//节点id字段
  labelField?:string;//节点名称字段
  childrenField?:string;//子节点字段
  parentField?:string;//父节点字段
  checkable?:boolean;
  modelValue?:string[] | number[];
}>(),{
  transform:false,
  blockNode:true,
  rowField:'id',
  labelField:'name',
  childrenField:'children',
  parentField:'parentId',
  checkable:false,
  expandLayer:0,
})

const emit = defineEmits(["check","select"])


const fieldNames = {
  key: props.rowField,
  title: props.labelField,
  children: props.childrenField,
};

const treeData = computed(() => {
  if(props.transform){
    return buildTree(props.options);
  }else{
    return props.options;
  }
});
function getExpandedKeysByLayer(
  nodes: any[],
  expandLayer: number,
  currentLayer: number = 0,
): (string | number)[] {
  const expandedKeys: (string | number)[] = [];
  
  if (!Array.isArray(nodes)) return expandedKeys;
  if(expandLayer <= 0)return expandedKeys;

  for (const node of nodes) {
    if (currentLayer < expandLayer) {
      expandedKeys.push(node[props.rowField]);
    }

    const children = node[props.childrenField];
    if (Array.isArray(children) && children.length > 0) {
      const childExpanded = getExpandedKeysByLayer(
        children,
        expandLayer,
        currentLayer + 1,
      );
      expandedKeys.push(...childExpanded);
    }
  }

  return expandedKeys;
}

const expandedKeys = ref<(string | number)[]>([]);
const checkedKeys = ref<(string | number)[]>([]);

// 初始化设定
watch(
  () => treeData.value,
  (val) => {
    if (props.expandLayer !== 0) {
      expandedKeys.value = getExpandedKeysByLayer(val, props.expandLayer);
    }
  },
  { immediate: true }
);

const onCheck = (keys:(string | number)[],info:any)=>{
    const node = info.checkedNodes.at(-1);
    const key = keys.at(-1);
    emit("check",{
      key,
      node,
      keys:checkedKeys,
      nodes:info.checkedNodes
    })
  }
const onClickNode = (keys:(string | number)[],info:any)=>{
    const node = info.selectedNodes.at(-1);
    const key = keys.at(-1);
    emit("select",{
      key,
      node,
      keys:checkedKeys,
      nodes:info.selectedNodes
    })
}
</script>

<template>
  <div class="y-tree">
    <a-tree :treeData="treeData" v-model:expandedKeys="expandedKeys" @check="onCheck" @select="onClickNode" v-model:checkedKeys="checkedKeys" :checkable="checkable" :fieldNames="fieldNames"></a-tree>
  </div>
</template>