<script setup lang="ts">
defineOptions({
  name: "YTree",
});
import type { TreeProps } from 'ant-design-vue';

type TreeNode = NonNullable<TreeProps['treeData']>[number];//NonNullable去除undefined和null，[number]固定写法	从数组中提取出单个元素类型
const props = withDefaults(defineProps<{
  treeData: TreeNode[] | undefined,
  expandLayer?: number,//展开层数
  defaultExpandAll?: boolean,
  modelValue?: string | string[],
  title?: string;
  key?: string;
  children?: string;
}>(), {
  expandLayer: 0,
  title: 'title',
  key: 'key',
  children: 'children'
})
// 获取所有层级key
function getAllKeys(tree: TreeNode[]): (string | number)[] {
  if (!tree) return [];

  return tree.flatMap(t => [
    t.key,
    ...(t.children ? getAllKeys(t.children) : [])
  ]);
}
// 递归获取指定层级内的 key
function getExpandedKeysByLayer(tree: TreeNode[], maxLayer: number, currentLayer = 1): (string | number)[] {
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
  console.log(props.treeData);
  if(!props.treeData)return;
  if (defaultExpandAll) {
    expandedKeys.value = getAllKeys(props.treeData);
  } else if (+expandLayer > 0) {
    expandedKeys.value = getExpandedKeysByLayer(props.treeData, +expandLayer)
  }
}, { immediate: true })
const fieldNames = computed(() => ({
  title: props.title,
  key: props.key,
  children: props.children
}));
</script>

<template>
  <div class="y-tree-wrapper">
    <a-tree v-model:expandedKeys="expandedKeys" :treeData="treeData" v-bind="$attrs" :fieldNames="fieldNames">
      <template #title="item">
          <span>{{ item[fieldNames.title] }}</span>
      </template>
    </a-tree>
    
  </div>
</template>

<style scoped lang="scss">
.y-tree-wrapper {}
</style>