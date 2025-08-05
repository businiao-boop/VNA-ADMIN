<template>
  <div class="y-table" :style="{ height: height }">
    <vxe-table ref="xTable" :data="computedData" :round="round" height="auto" :tree-config="computedTreeConfig"
      @current-change="handleCurrentChange" @cell-click="handleCellClick" @cell-dblclick="handleCellDblclick"
      @toggle-tree-expand="handleToggleTreeExpand">
      <!-- 通过插槽传递列配置 -->
      <slot name="columns"></slot>

    </vxe-table>
  </div>
</template>

<script setup>
import { buildTree } from "@/utils/buildTree";
import { computed } from "vue";

/**
 * YTable组件 - 基于vxe-grid封装的表格组件
 * 提供统一的数据表格展示功能，支持分页、工具栏、数据加载等
 */

const props = defineProps({
  /**
   * 表格数据数组
   * 类型：Array
   * 默认值：[]
   */
  data: {
    type: Array,
    default: () => []
  },
  /**
   * 表格高度
   * 类型：String | Number
   * 默认值："auto"
   * 示例：400 或 "400px"
   */
  height: {
    type: [String, Number],
    default: "100%"
  },
  round: {
    type: Boolean,
    default: true
  },
  // 是否开启树形结构
  tree: {
    type: Boolean,
    default: false
  },
  /**
   * 树形配置
   * 类型：Object
   * 默认值：{ children: 'children', hasChild: 'hasChild', expandAll: false }
   */
  treeConfig: {
    type: Object,
    default: () => ({
      transform: false,
      childrenField: "children",
      parentField: "parentId",
      rowField: "id"
    })
  },

});


const emit = defineEmits([
  "current-change", // 当前行变化事件
  "cell-click",     // 单元格点击事件
  "cell-dblclick",  // 单元格双击事件
  "page-change",    // 分页变化事件
  "toggle-tree-expand" // 树形展开/收起事件
]);

// 计算表格数据
const computedData = computed(() => {
  if (!props.tree) return props.data;
  const { transform, childrenField = 'children', parentField = 'parentId', rowField = 'id' } = props.treeConfig;
  if (transform) {
    return buildTree(props.data, {
      childrenField,
      parentField,
      rowField
    });
  }
  return props.data;
});

// 计算树形配置
const computedTreeConfig = computed(() => {
  if (!props.tree) return null;
  return {
    rowField: "id",
    parentField: "parentId",
    childrenField: "children",
    ...props.treeConfig,
  };
});

const xTable = ref(null);

/**
 * 当前行变化事件处理
 * @param {Object} params - 事件参数
 */
const handleCurrentChange = (params) => {
  emit("current-change", params);
};

/**
 * 单元格点击事件处理
 * @param {Object} params - 事件参数
 */
const handleCellClick = (params) => {
  emit("cell-click", params);
};

/**
 * 单元格双击事件处理
 * @param {Object} params - 事件参数
 */
const handleCellDblclick = (params) => {
  emit("cell-dblclick", params);
};

/**
 * 获取表格引用
 * @returns {Object} vxe-table实例
 */
const getTableRef = () => xTable.value;

/**
 * 重新加载表格数据
 * @param {Array} data - 新的数据数组
 */
const reloadData = (data) => {
  if (xTable.value) {
    xTable.value.loadData(data);
  }
};

/**
 * 刷新表格数据
 */
const refreshData = () => {
  // vxe-table不需要单独的刷新方法，数据变化会自动更新
  if (xTable.value) {
    xTable.value.refreshData();
  }
};

/**
 * 树形展开/收起事件处理
 * @param {Object} params - 事件参数
 */
const handleToggleTreeExpand = (params) => {
  emit("toggle-tree-expand", params);
};

/**
 * 展开所有树节点
 */
const setAllTreeExpand = (expanded = true) => {
  if (xTable.value) {
    xTable.value.setAllTreeExpand(expanded);
  }
};

/**
 * 展开指定树节点
 * @param {Array} rows - 要展开的行数据
 * @param {Boolean} expanded - 是否展开
 */
const setTreeExpand = (rows, expanded = true) => {
  if (xTable.value) {
    xTable.value.setTreeExpand(rows, expanded);
  }
};

/**
 * 获取展开的树节点
 * @returns {Array} 展开的树节点数据
 */
const getTreeExpandRecords = () => {
  if (xTable.value) {
    return xTable.value.getTreeExpandRecords();
  }
  return [];
};

defineExpose({
  getTableRef,
  reloadData,
  refreshData,
  setAllTreeExpand,
  setTreeExpand,
  getTreeExpandRecords
});
</script>

<style scoped lang="scss">
.y-table {
}
</style>