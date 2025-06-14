<script setup lang="ts">
defineOptions({
  name: "YTree",
});
import type { TreeProps } from 'ant-design-vue';

import type { Key } from 'ant-design-vue/es/_util/type'
import type { AntTreeNodeSelectedEvent } from 'ant-design-vue/es/tree';
type TreeNode = NonNullable<TreeProps['treeData']>[number];//NonNullable去除undefined和null，[number]固定写法	从数组中提取出单个元素类型
const props = withDefaults(defineProps<{
  treeData: any[],
  expandLayer?: number,//展开层数
  defaultExpandAll?: boolean,
  modelValue?: string | string[],
  rowKey?:string,
  title?: string,
  children?: string,
}>(), {
  expandLayer: 0,
  rowKey:"key",
  title: 'title',
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
    if (node.key != null && currentLayer <= maxLayer) {
      keys.push(node.key);
    }
    if (node.children && currentLayer < maxLayer) {
      keys.push(...getExpandedKeysByLayer(node.children, maxLayer, currentLayer + 1));
    }
  }

  return keys;
}

const expandedKeys = ref<(string | number)[]>([]);
// 设置层级
watch(() => [props.expandLayer, props.defaultExpandAll], ([expandLayer, defaultExpandAll]) => {
  if(!props.treeData)return;
  if (defaultExpandAll) {
    expandedKeys.value = getAllKeys(props.treeData);
  } else if (+expandLayer > 0) {
    expandedKeys.value = getExpandedKeysByLayer(props.treeData, +expandLayer)
  }
}, { immediate: true })
function onSelectTree(tree:Key[],e:AntTreeNodeSelectedEvent){
  if(e){
    const node = e.node;
    emit("select",node.dataRef)
  }
}
const fieldNames = computed(()=>{
  return {
    key: props.rowKey,
    title: props.title,
    children: props.children
  }
})
 function buildTree(trees: any[]): any[] {
  const treeMap = new Map<number, any>();
  const tree: any[] = [];
  trees.forEach((t) => {
    const x = {
      ...t,
      children:[]
    };
    treeMap.set(t.id, x);
  });

  trees.forEach((t) => {
    const current = treeMap.get(t.id);
    if (t.parentId && treeMap.has(t.parentId)) {
      treeMap.get(t.parentId).children.push(current);
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
  <div class="y-tree-wrapper">
    <a-tree v-model:expandedKeys="expandedKeys" :treeData="value" v-bind="$attrs" :fieldNames="fieldNames" @select="onSelectTree">
      <template #title="item">
        <slot :item="item">
          <span>{{ item[fieldNames.title] }}</span>
        </slot>
      </template>
    </a-tree>
    
  </div>
</template>

<style scoped lang="scss">
.y-tree-wrapper {}
</style>