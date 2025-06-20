<script setup lang="ts">
defineOptions({
  name: "YTree",
});
import type { TreeProps } from 'ant-design-vue';
import { DataNode } from 'ant-design-vue/es/tree';

import type { Key } from 'ant-design-vue/es/_util/type'
import type { AntTreeNodeSelectedEvent } from 'ant-design-vue/es/tree';
type TreeNode = NonNullable<TreeProps['treeData']>[number];//NonNullable去除undefined和null，[number]固定写法	从数组中提取出单个元素类型
const props = withDefaults(defineProps<{
  treeData: any[],
  expandLayer?: number,//展开层数
  defaultExpandAll?: boolean,
  modelValue?: string | string[],
  rowKey?:string,
  titleKey?: string,
  children?: string,
}>(), {
  expandLayer: 0,
  rowKey:"key",
  titleKey: 'title',
  children: 'children',
})
const emit = defineEmits(['select'])
// 获取所有层级key
function getAllKeys(tree: any[]): (string | number)[] {
  if (!tree) return [];

  return tree.flatMap(t => [
    t.key,
    ...(t.children ? getAllKeys(t.children) : [])
  ]);
}
// 递归获取指定层级内的 key
function getExpandedKeysByLayer(tree: any[], maxLayer: number, currentLayer = 1): (string | number)[] {
  const keys: (string | number)[] = [];
  if(!tree)return keys;
  if (maxLayer < currentLayer) return keys;
  for (const node of tree) {
    if (node[props.rowKey] != null && currentLayer <= maxLayer) {
      keys.push(node[props.rowKey]);
    }
    if (node.children && currentLayer < maxLayer) {
      keys.push(...getExpandedKeysByLayer(node.children, maxLayer, currentLayer + 1));
    }
  }

  return keys;
}

const expandedKeys = ref<(string | number)[]>([]);
// 设置层级
watch(() => [props.expandLayer, props.defaultExpandAll,props.treeData], ([expandLayer, defaultExpandAll]) => {
  if(!props.treeData)return;
  if (defaultExpandAll) {
    expandedKeys.value = getAllKeys(props.treeData);
  } else if (+expandLayer > 0) {
    expandedKeys.value = getExpandedKeysByLayer(props.treeData, +expandLayer)
  }
}, { immediate: true })
const selectedTree = ref<DataNode[]>([]);
const selectedKey = computed({
  get(){
    const item = selectedTree.value[0];
    return item ? [item[props.rowKey]] : [];
  },
  set(val){
    selectedTree.value = val[0];
  }
})
function onSelectTree(tree:Key[],e:AntTreeNodeSelectedEvent){
  if(e.node.dataRef){
    const node = e.node.dataRef;
    selectedTree.value = [node];
    emit("select",node)
  }
}
const fieldNames = computed(()=>{
  return {
    key: props.rowKey,
    title: props.titleKey,
    children: props.children
  }
})
 function buildTree(trees: any[]): any[] {
  
  const treeMap = new Map<string | number, any>();
  const tree: any[] = [];
  trees.forEach((t) => {
    const x = {
      ...t,
      [props.children]:[]
    };
    treeMap.set(t[props.rowKey], x);
  });
  
  trees.forEach((t) => {
    const current = treeMap.get(t[props.rowKey]);
    if (t.parentId && treeMap.has(t.parentId)) {
      treeMap.get(t.parentId)[props.children].push(current);
    } else {
      tree.push(current);
    }
  });

  return tree;
}


const value = computed(() => {
  return buildTree(props.treeData);
});

</script>

<template>
  <div class="y-tree-wrapper y-tree">
    <a-tree v-model:expandedKeys="expandedKeys" :selectedKeys="selectedKey" :treeData="value" v-bind="$attrs" :fieldNames="fieldNames" @select="onSelectTree">
      <template #title="item">
        <slot name="title" :item="item">
          <div class="y-tree-title">
            <!-- <span v-if="item.icon">
              <i class="iconfont" :class="item.icon"></i>
            </span> -->
            <span>{{ item[fieldNames.title] }}</span>
          </div>
        </slot>
      </template>
    </a-tree>
  </div>
</template>

<style scoped lang="scss">
.y-tree-wrapper {
  .ant-tree-node-selected{
    background-color: #e6f4ff;
  }
  // #e6f4ff
}
</style>