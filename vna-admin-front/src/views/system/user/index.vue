<template>
  <div class="user-management">
    <a-card title="用户管理">
      <template #extra>
        <a-button type="primary" @click="handleAdd">新增用户</a-button>
      </template>

      <div class="search-section">
        <a-row :gutter="16">
          <a-col :span="6">
            <a-input v-model:value="searchForm.username" placeholder="请输入用户名" allow-clear />
          </a-col>
          <a-col :span="6">
            <a-input v-model:value="searchForm.nickname" placeholder="请输入昵称" allow-clear />
          </a-col>
          <a-col :span="6">
            <a-input v-model:value="searchForm.email" placeholder="请输入邮箱" allow-clear />
          </a-col>
          <a-col :span="6">
            <a-button type="primary" @click="handleSearch">搜索</a-button>
            <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
          </a-col>
        </a-row>
      </div>

      <a-table :columns="columns" :data-source="userData" :loading="loading" :pagination="pagination" row-key="id"
        @change="handleTableChange">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-tag :color="(record.status === 1 || record.status === true) ? 'green' : 'red'">
              {{ (record.status === 1 || record.status === true) ? '启用' : '禁用' }}
            </a-tag>
          </template>

          <template v-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="handleEdit(record)">编辑</a-button>
              <a-button type="link" size="small" danger @click="handleDelete(record)">删除</a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>

    <!-- 新增/编辑用户弹窗 -->
    <a-modal v-model:open="modalVisible" :title="modalTitle" :confirm-loading="modalLoading" @ok="handleModalOk"
      @cancel="handleModalCancel">
      <a-form :model="userForm" :rules="userRules" ref="userFormRef" :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }">
        <a-form-item label="用户名" name="username">
          <a-input v-model:value="userForm.username" placeholder="请输入用户名" />
        </a-form-item>

        <a-form-item label="昵称" name="nickname">
          <a-input v-model:value="userForm.nickname" placeholder="请输入昵称" />
        </a-form-item>

        <a-form-item label="邮箱" name="email">
          <a-input v-model:value="userForm.email" placeholder="请输入邮箱" />
        </a-form-item>

        <a-form-item label="手机号" name="phone">
          <a-input v-model:value="userForm.phone" placeholder="请输入手机号" />
        </a-form-item>

        <a-form-item v-if="!userForm.id" label="密码" name="password">
          <a-input-password v-model:value="userForm.password" placeholder="请输入密码" />
        </a-form-item>

        <a-form-item label="角色" name="roleIds">
          <a-select
            v-model:value="userForm.roleIds"
            mode="multiple"
            placeholder="请选择角色"
            :options="roleOptions"
            :field-names="{ label: 'name', value: 'id' }"
          />
        </a-form-item>
        
        <a-form-item label="状态" name="status">
          <a-switch v-model:checked="userForm.status" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { message, Modal } from 'ant-design-vue';
import { getUserPage, saveUser, deleteUser, getUserDetail } from '@/api/user';
import { getAllRoles } from '@/api/role';

const loading = ref(false);
const userData = ref([]);
const modalVisible = ref(false);
const modalLoading = ref(false);
const modalTitle = ref('');
const userFormRef = ref();
const roleOptions = ref([]);

const searchForm = reactive({
  username: '',
  nickname: '',
  email: ''
});

const userForm = reactive({
  id: undefined,
  username: '',
  nickname: '',
  email: '',
  phone: '',
  password: '',
  isActive: true,
  roleIds: []
});

const userRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  roleIds: [{ required: true, message: '请选择角色', trigger: 'change' }]
};

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
  { title: '用户名', dataIndex: 'username', key: 'username' },
  { title: '昵称', dataIndex: 'nickname', key: 'nickname' },
  { title: '邮箱', dataIndex: 'email', key: 'email' },
  { title: '手机号', dataIndex: 'phone', key: 'phone' },
  { title: '角色', dataIndex: 'roles', key: 'roles', width: 200, render: (roles) => roles?.map(role => role.name).join(', ') || '-' },
  { title: '状态', dataIndex: 'isActive', key: 'status', width: 100 },
  { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
  { title: '操作', key: 'action', width: 150, fixed: 'right' }
];

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: total => `共 ${total} 条记录`
});

const loadUsers = async () => {
  loading.value = true;
  try {
    const response = await getUserPage(
      { pageNum: pagination.current, limit: pagination.pageSize },
      searchForm
    );
    userData.value = response.data || [];
    pagination.total = response.total || 0;
  } catch (error) {
    message.error('加载用户数据失败');
    console.error('加载用户数据失败:', error);
  } finally {
    loading.value = false;
  }
};

const handleAdd = () => {
  modalTitle.value = '新增用户';
  userForm.id = undefined;
  Object.assign(userForm, {
    username: '',
    nickname: '',
    email: '',
    phone: '',
    password: '',
    isActive: true,
    roleIds: []
  });
  modalVisible.value = true;
};

const loadRoles = async () => {
  try {
    const response = await getAllRoles();
    roleOptions.value = response.data || response || [];
  } catch (error) {
    message.error('加载角色列表失败');
    console.error('加载角色列表失败:', error);
  }
};

const handleEdit = async (record) => {
  modalTitle.value = '编辑用户';
  try {
    const response = await getUserDetail({ id: record.id });
    const data = response.data || response;
    userForm.id = data.id;
    Object.assign(userForm, {
      username: data.username,
      nickname: data.nickname,
      email: data.email,
      phone: data.phone,
      isActive: data.isActive === 1 || data.isActive === true,
      roleIds: data.roles ? data.roles.map(role => role.id) : []
    });
    modalVisible.value = true;
  } catch (error) {
    message.error('获取用户详情失败');
  }
};

const handleDelete = (record) => {
  Modal.confirm({
    title: '确认删除',
    content: `确定要删除用户 "${record.username}" 吗？`,
    okText: '确认',
    cancelText: '取消',
    onOk: async () => {
      try {
        await deleteUser({ id: record.id });
        message.success('删除成功');
        loadUsers();
      } catch (error) {
        message.error('删除失败');
      }
    }
  });
};

const handleSearch = () => {
  pagination.current = 1;
  loadUsers();
};

const handleReset = () => {
  Object.assign(searchForm, {
    username: '',
    nickname: '',
    email: ''
  });
  handleSearch();
};

const handleTableChange = (pagination) => {
  Object.assign(pagination, pagination);
  loadUsers();
};

const handleModalOk = async () => {
  try {
    await userFormRef.value.validate();
    modalLoading.value = true;

    const saveData = {
      ...userForm,
      status: userForm.status ? 1 : 0
    };

    await saveUser(saveData);
    message.success(userForm.id ? '更新用户成功' : '新增用户成功');
    modalVisible.value = false;
    loadUsers();
  } catch (error) {
    message.error(userForm.id ? '更新用户失败' : '新增用户失败');
    console.error('保存用户失败:', error);
  } finally {
    modalLoading.value = false;
  }
};

const handleModalCancel = () => {
  userFormRef.value?.resetFields();
  modalVisible.value = false;
};

onMounted(() => {
  loadUsers();
  loadRoles();
});
</script>

<style scoped lang="scss">
.user-management {
  .search-section {
    margin-bottom: 16px;
    padding: 16px;
    background: #f5f5f5;
    border-radius: 6px;
  }
}
</style>