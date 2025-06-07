<script setup lang="ts">
import YIcon from "@/components/YIcon/index.vue";
import { ColumnType, ListType } from "@/types/components/yConfigTable";
defineOptions({
  name: "YConfigTable",
});
const props = defineProps<{
  columns: ColumnType[];
  modelValue: ListType[];
}>();
const _columns = ref<ColumnType[]>(JSON.parse(JSON.stringify(props.columns)));
const _customOptions = ref<ColumnType[]>(JSON.parse(JSON.stringify(props.columns)));
const toolbar = ref(null);
const visible = ref(false);
const all = computed({
  get() {
    const index = _customOptions.value.findIndex((item) => {
      return !item.visible;
    });
    return index < 0;
  },
  set(val) {
    _customOptions.value.map(item=>item.visible = val);
  },
});
const reset = () => {
  _columns.value = JSON.parse(JSON.stringify(props.columns));
  _customOptions.value = JSON.parse(JSON.stringify(props.columns));
  visible.value = false;
};
const confirm = () => {
  _columns.value = JSON.parse(JSON.stringify(_customOptions.value));
  visible.value = false;
};
</script>
<template>
  <div class="y-confing-table">
    <div class="toolbar" ref="toolbar">
      <a-popover
      placement="bottomRight"
        :getPopupContainer="() => toolbar"
        v-model:open="visible"
        trigger="click"
      >
        <template #title>
          <a-checkbox v-model:checked="all">全部</a-checkbox>
        </template>
        <template #content>
          <ul class="popover-content">
            <li v-for="col in _customOptions" :key="col.field">
              <a-checkbox v-model:checked="col.visible">{{
                col.title
              }}</a-checkbox>
            </li>
          </ul>
          <div class="popover-footer">
            <a-popconfirm
              title="Are you sure delete this task?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="reset"
            >
              <a-button type="text" size="small">重置</a-button>
            </a-popconfirm>
            <a-button type="text" size="small" @click="visible = false"
              >取消</a-button
            >
            <a-button type="text" size="small" @click="confirm">确定</a-button>
          </div>
        </template>
        <a-button type="primary" shape="circle">
          <y-icon icon="AppstoreOutlined"></y-icon>
        </a-button>
      </a-popover>
    </div>
    <vxe-table :data="modelValue">
      <vxe-column
        v-for="col in _columns"
        :visible="col.visible"
        :field="col.field"
        :title="col.title"
        :key="col.field"
      ></vxe-column>
    </vxe-table>
  </div>
</template>

<style scoped lang="scss">
.y-confing-table {
  .toolbar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 40px;
    :deep(.ant-popover)  {
      .ant-popover-inner-content {
        display: flex;
        flex-direction: column;
        .popover-content{
          border: 1px solid #d9d9d9;
          border-left: none;
          border-right: none;
          padding: 5px;
          margin-bottom: 5px;
        }
        .popover-footer {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
