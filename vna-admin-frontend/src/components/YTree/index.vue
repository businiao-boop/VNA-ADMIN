<script setup lang="ts">
defineOptions({ name: "YTree" });

import { ref, watch, computed } from "vue";
import { buildTree } from "@/utils/buildTree";
import { TreeEventType } from "@/types/components/yTree";

const props = withDefaults(
  defineProps<{
    options: Object[];
    transform?: boolean;
    expandLayer?: number;
    blockNode?: boolean;
    rowField?: string;
    labelField?: string;
    childrenField?: string;
    parentField?: string;
    checkable?: boolean;
    height?: number;
    modelValue?: (string | number)[];
  }>(),
  {
    transform: false,
    blockNode: true,
    rowField: "id",
    labelField: "name",
    childrenField: "children",
    parentField: "parentId",
    height: 300,
    checkable: false,
    expandLayer: 0,
  }
);

const emit = defineEmits(["check", "select", "update:modelValue"]);

const fieldNames = {
  key: props.rowField,
  title: props.labelField,
  children: props.childrenField,
};

const treeData = computed(() => {
  return props.transform
    ? buildTree(props.options, {
        rowKey: props.rowField,
        parentKey: props.parentField,
        childrenKey: props.childrenField,
      })
    : props.options;
});

/** 根据展开层级获取默认展开的节点 key */
function getExpandedKeysByLayer(
  nodes: any[],
  expandLayer: number,
  currentLayer: number = 0
): (string | number)[] {
  const expandedKeys: (string | number)[] = [];
  if (!Array.isArray(nodes) || expandLayer <= 0) return expandedKeys;
  for (const node of nodes) {
    if (currentLayer < expandLayer) {
      expandedKeys.push(node[props.rowField]);
    }
    const children = node[props.childrenField];
    if (Array.isArray(children)) {
      expandedKeys.push(
        ...getExpandedKeysByLayer(children, expandLayer, currentLayer + 1)
      );
    }
  }
  return expandedKeys;
}

const expandedKeys = ref<(string | number)[]>([]);

const checkedKeysValue = computed({
  get() {
    return props.modelValue ?? [];
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

// 树数据变化时自动展开节点
watch(
  () => treeData.value,
  (val) => {
    if (props.expandLayer !== 0) {
      expandedKeys.value = getExpandedKeysByLayer(val, props.expandLayer);
    }
  },
  { immediate: true }
);

function onCheck(checkedKeys: (string | number)[], info: TreeEventType) {
  emit("check", info);
}

function onSelect(selectedKeys: (string | number)[], info: TreeEventType) {
  emit("select", info);
}
</script>

<template>
  <!-- :style="{ height: height, overflowY: 'auto' }" -->
  <div class="y-tree" >
    <a-tree
      :height="height"
      :treeData="treeData"
      v-model:expandedKeys="expandedKeys"
      v-model:checkedKeys="checkedKeysValue"
      :checkable="checkable"
      :fieldNames="fieldNames"
      :blockNode="blockNode"
      @check="onCheck"
      @select="onSelect"
    />
  </div>
</template>

<style scoped>
.y-tree {
  overflow: hidden;
}
</style>
