<script setup>
import { ref, reactive, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { TreeSelect } from 'ant-design-vue';
import YTable from '@/components/YTable/index.vue';
import YSelect from '@/components/YSelect/index.vue';
import YWrapper from '@/components/YWrapper/index.vue';
import { getAllMenus, saveMenu, deleteMenu, getMenuDetail } from '@/api/menu';
import { OPTIONS } from '@/constants/options';
import { buildTree } from "@/utils/buildTree";

const loading = ref(false);
const menuData = ref([]);
const modalVisible = ref(false);
const modalLoading = ref(false);
const modalTitle = ref('');
const menuFormRef = ref();
const yTable = ref(null);

const menuForm = reactive({
  id: undefined,
  name: '',
  path: '',
  component: '',
  parentId: null,
  icon: '',
  sort: 0,
  status: 1
});

const menuRules = {
  name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  path: [{ required: true, message: '请输入路由地址', trigger: 'blur' }],
  component: [{ required: true, message: '请输入组件路径', trigger: 'blur' }]
};





const loadMenus = async () => {
  loading.value = true;
  try {
    const response = await getAllMenus({});
    const flatData = Array.isArray(response) ? response : response.data || [];
    menuData.value = buildTree(flatData);
  } catch (error) {
    message.error('加载菜单数据失败');
  } finally {
    loading.value = false;
  }
};

const handleAdd = () => {
  modalTitle.value = '新增菜单';
  menuForm.id = undefined;
  Object.assign(menuForm, {
    name: '',
    path: '',
    component: '',
    parentId: null,
    icon: '',
    sort: 0,
    status: 1
  });
  modalVisible.value = true;
};

const handleEdit = async (record) => {
  try {
    modalTitle.value = '编辑菜单';
    const response = await getMenuDetail(record.id);

    const menuData = response.data || response;
    Object.assign(menuForm, menuData);
    modalVisible.value = true;
  } catch (error) {
    message.error('获取菜单详情失败');
  }
};

const handleDelete = async (record) => {
  try {
    await deleteMenu(record.id);
    message.success('删除菜单成功');
    loadMenus();
  } catch (error) {
    message.error('删除菜单失败');
  }
};

const handleAddChild = (record) => {
  modalTitle.value = '新增子菜单';
  menuForm.id = undefined;
  Object.assign(menuForm, {
    name: '',
    path: '',
    component: '',
    parentId: record.id,
    icon: '',
    sort: 0,
    status: 1
  });
  modalVisible.value = true;
};

const handleModalOk = async () => {
  try {
    await menuFormRef.value.validate();
    modalLoading.value = true;

    await saveMenu(menuForm);

    message.success(menuForm.id ? '更新菜单成功' : '新增菜单成功');
    modalVisible.value = false;
    loadMenus();
  } catch (error) {
    message.error(menuForm.id ? '更新菜单失败' : '新增菜单失败');
  } finally {
    modalLoading.value = false;
  }
};

const handleModalCancel = () => {
  menuFormRef.value?.resetFields();
  modalVisible.value = false;
};

onMounted(() => {
  loadMenus();
});
</script>

<template>
  <YWrapper title="菜单管理">
    <template #extra>
      <a-button type="primary" @click="handleAdd">
        <PlusOutlined />
        新增菜单
      </a-button>
    </template>

    <YTable ref="yTable" :data="menuData" id="id" :tree-config="{ childrenField: 'children' }" default-expand-all>
      <template #columns>
        <vxe-column field="name" title="菜单名称" tree-node min-width="180">
          <template #default="{ row }">
            <span>
              {{ row.name }}
            </span>
          </template>
        </vxe-column>
        <vxe-column field="icon" title="图标" width="80">
          <template #default="{ row }">
            <component :is="row.icon" v-if="row.icon" />
          </template>
        </vxe-column>
        <vxe-column field="sort" title="排序" width="80"></vxe-column>
        <vxe-column field="component" title="组件路径" min-width="200"></vxe-column>
        <vxe-column field="status" title="状态" width="100">
          <template #default="{ row }">
            <a-tag :color="row.status === 1 ? 'green' : 'red'">
              {{ row.status === 1 ? '正常' : '禁用' }}
            </a-tag>
          </template>
        </vxe-column>
        <vxe-column field="createTime" title="创建时间" min-width="120"></vxe-column>
        <vxe-column title="操作" width="220" fixed="right">
          <template #default="{ row }">
            <a-space>
              <a-button type="link" size="small" @click="handleEdit(row)">编辑</a-button>
              <a-button type="link" size="small" @click="handleAddChild(row)">添加子菜单</a-button>
              <a-popconfirm title="确定要删除该菜单吗？" @confirm="handleDelete(row)">
                <a-button type="link" size="small" danger>删除</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </vxe-column>
      </template>
    </YTable>

    <!-- 新增/编辑菜单弹窗 -->
    <a-modal v-model:open="modalVisible" :title="modalTitle" :confirm-loading="modalLoading" @ok="handleModalOk"
      @cancel="handleModalCancel" width="600px">
      <a-form :model="menuForm" :rules="menuRules" ref="menuFormRef" :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }">
        <a-form-item label="菜单名称" name="name">
          <a-input v-model:value="menuForm.name" placeholder="请输入菜单名称" />
        </a-form-item>

        <a-form-item label="父级菜单" name="parentId">
          <a-tree-select v-model:value="menuForm.parentId" :tree-data="menuData" placeholder="请选择父级菜单"
            tree-default-expand-all :field-names="{ children: 'children', label: 'name', value: 'id' }" />
        </a-form-item>

        <a-form-item label="路由地址" name="path">
          <a-input v-model:value="menuForm.path" placeholder="请输入路由地址" />
        </a-form-item>

        <a-form-item label="组件路径" name="component">
          <a-input v-model:value="menuForm.component" placeholder="请输入组件路径" />
        </a-form-item>

        <a-form-item label="菜单图标" name="icon">
          <a-input v-model:value="menuForm.icon" placeholder="请输入菜单图标" />
        </a-form-item>

        <a-form-item label="排序" name="sort">
          <a-input-number v-model:value="menuForm.sort" :min="0" style="width: 100%" />
        </a-form-item>

        <a-form-item label="状态" name="status">
          <a-select v-model:value="menuForm.status" placeholder="请选择状态">
            <a-select-option :value="1">正常</a-select-option>
            <a-select-option :value="0">禁用</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </YWrapper>
</template>

<style scoped lang="scss">
.menu-management {
  padding: 24px;
}
</style>