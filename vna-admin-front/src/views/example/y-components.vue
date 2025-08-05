<template>
  <YWrapper title="Y组件使用示例" :padding="24">
    <a-row :gutter="[16, 16]">
      <a-col :span="24">
        <a-card title="YTable 表格组件">
          <template #extra>
            <a-button type="primary" @click="handleAdd">
              <PlusOutlined />
              新增
            </a-button>
          </template>
          
          <YTable
            ref="yTableRef"
            :data="tableData"
            :columns="tableColumns"
            :loading="loading"
            height="400"
          >
            <template #status_default="{ row }">
              <a-tag :color="row.status === 1 ? 'green' : 'red'">
                {{ row.status === 1 ? '启用' : '禁用' }}
              </a-tag>
            </template>
            
            <template #action_default="{ row }">
              <a-space>
                <a-button type="link" size="small" @click="handleEdit(row)">
                  编辑
                </a-button>
                <a-popconfirm
                  title="确定要删除吗？"
                  @confirm="handleDelete(row)"
                >
                  <a-button type="link" size="small" danger>
                    删除
                  </a-button>
                </a-popconfirm>
              </a-space>
            </template>
          </YTable>
        </a-card>
      </a-col>
    </a-row>
  </YWrapper>
</template>

<script setup>


const yTableRef = ref(null);
const loading = ref(false);
const tableData = ref([]);

const tableColumns = [
  {
    type: "seq",
    width: 60,
    title: "序号"
  },
  {
    field: "name",
    title: "名称",
    minWidth: 120
  },
  {
    field: "code",
    title: "编码",
    minWidth: 100
  },
  {
    field: "status",
    title: "状态",
    slots: { default: "status_default" },
    width: 80
  },
  {
    field: "createTime",
    title: "创建时间",
    minWidth: 150
  },
  {
    title: "操作",
    slots: { default: "action_default" },
    width: 120,
    fixed: "right"
  }
];

const loadData = async () => {
  loading.value = true;
  try {
    // 模拟数据
    tableData.value = [
      {
        id: 1,
        name: "示例数据1",
        code: "EX001",
        status: 1,
        createTime: "2024-01-01 10:00:00"
      },
      {
        id: 2,
        name: "示例数据2",
        code: "EX002",
        status: 0,
        createTime: "2024-01-02 11:00:00"
      }
    ];
  } catch (error) {
    console.error("加载数据失败:", error);
  } finally {
    loading.value = false;
  }
};

const handleAdd = () => {
};

const handleEdit = (row) => {
};

const handleDelete = (row) => {
};

onMounted(() => {
  loadData();
});
</script>

<style scoped lang="scss">
.y-components-example {
  padding: 20px;
}
</style>