<template>
  <div class="y-table" :style="{ height: height }">
    <vxe-table v-bind="$attrs" ref="xTable" :data="data" height="auto" @current-change="handleCurrentChange"
      @cell-click="handleCellClick" @cell-dblclick="handleCellDblclick">
      <!-- 通过插槽传递列配置 -->
      <slot name="columns"></slot>

    </vxe-table>
  </div>
</template>

<script setup>
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
});

const emit = defineEmits([
  "current-change", // 当前行变化事件
  "cell-click",     // 单元格点击事件
  "cell-dblclick",  // 单元格双击事件
  "page-change"     // 分页变化事件
]);

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

defineExpose({
  getTableRef,
  reloadData,
  refreshData
});
</script>

<style scoped lang="scss">
.y-table {
}
</style>