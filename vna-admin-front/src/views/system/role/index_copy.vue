<template>
  <YWrapper title="角色管理">
    <!-- 左侧角色列表 -->
    <template #left>
      <div class="role-list-container">
        <div class="role-list-header">
          <a-input-search v-model:value="searchForm.name" placeholder="搜索角色名称" allow-clear @search="handleSearch"
            style="margin-bottom: 16px" />
          <a-button type="primary" block @click="handleAdd" style="margin-bottom: 16px">
            新增角色
          </a-button>
        </div>

        <a-list :data-source="roleData" :loading="loading" :pagination="false" class="role-list">
          <template #renderItem="{ item }">
            <a-list-item :class="{ 'selected': selectedRole?.id === item.id }" @click="selectRole(item)"
              class="role-list-item">
              <a-list-item-meta :title="item.name" :description="item.code">
                <template #avatar>
                  <a-avatar :style="{ backgroundColor: item.status === 1 ? '#87d068' : '#f50' }">
                    {{ item.name.charAt(0) }}
                  </a-avatar>
                </template>
              </a-list-item-meta>
              <template #actions>
                <a-dropdown>
                  <a-button type="text" size="small">
                    <template #icon>
                      <EllipsisOutlined />
                    </template>
                  </a-button>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item @click="handleEdit(item)">编辑</a-menu-item>
                      <a-menu-item @click="handlePermission(item)">权限</a-menu-item>
                      <a-menu-item danger @click="handleDelete(item)">删除</a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </template>
            </a-list-item>
          </template>
        </a-list>
      </div>
    </template>

    <!-- 右侧角色详情和权限配置 -->
    <div class="role-detail-container">
      <a-card title="角色详情" class="role-info-card">
        <a-form :model="selectedRoleForm" :rules="roleRules" ref="roleFormRef">
          <!-- 第一行：角色标识和角色名称 -->
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="角色标识" name="code" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                <a-input v-model:value="selectedRoleForm.code" placeholder="请输入角色标识" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="角色名称" name="name" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                <a-input v-model:value="selectedRoleForm.name" placeholder="请输入角色名称" />
              </a-form-item>
            </a-col>
          </a-row>

          <!-- 第二行：角色描述和状态 -->
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="角色描述" name="description" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                <a-textarea v-model:value="selectedRoleForm.description" placeholder="请输入角色描述" :rows="3" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="状态" name="status" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                <a-checkbox v-model:checked="selectedRoleForm.status" :checked-value="1" :unchecked-value="0">
                  启用
                </a-checkbox>
              </a-form-item>
            </a-col>
          </a-row>

          <!-- 保存按钮 -->
          <a-form-item :wrapper-col="{ span: 24 }" style="text-align: center">
            <a-button type="primary" @click="saveRoleDetail" :loading="savingRole">保存角色</a-button>
          </a-form-item>
        </a-form>
      </a-card>

      <a-card title="菜单权限" class="menu-permission-card" style="margin-top: 16px">
        <div class="menu-permission-table">
          <div class="permission-header">
            <div class="menu-name">菜单名称</div>
            <div class="permissions">
              <div class="permission-item">查看</div>
              <div class="permission-item">新增</div>
              <div class="permission-item">修改</div>
              <div class="permission-item">删除</div>
            </div>
            <div class="actions">操作</div>
          </div>
          
          <a-tree
            :tree-data="menuTreeData"
            :field-names="{ title: 'name', key: 'id', children: 'children' }"
            default-expand-all
            class="permission-tree"
          >
            <template #title="{ name, data }">
              <div class="permission-row">
                <div class="menu-name">{{ name }}</div>
                <div class="permissions">
                  <div class="permission-item">
                    <a-checkbox
                      :checked="isMenuPermissionChecked(data.id, 'view')"
                      @change="(e) => toggleMenuPermission(data.id, 'view', e.target.checked)"
                      :disabled="!selectedRole"
                    />
                  </div>
                  <div class="permission-item">
                    <a-checkbox
                      :checked="isMenuPermissionChecked(data.id, 'add')"
                      @change="(e) => toggleMenuPermission(data.id, 'add', e.target.checked)"
                      :disabled="!selectedRole"
                    />
                  </div>
                  <div class="permission-item">
                    <a-checkbox
                      :checked="isMenuPermissionChecked(data.id, 'edit')"
                      @change="(e) => toggleMenuPermission(data.id, 'edit', e.target.checked)"
                      :disabled="!selectedRole"
                    />
                  </div>
                  <div class="permission-item">
                    <a-checkbox
                      :checked="isMenuPermissionChecked(data.id, 'delete')"
                      @change="(e) => toggleMenuPermission(data.id, 'delete', e.target.checked)"
                      :disabled="!selectedRole"
                    />
                  </div>
                </div>
                <div class="actions">
                  <a-button 
                    type="link" 
                    size="small" 
                    @click="openPermissionModal(data)"
                    :disabled="!selectedRole"
                  >
                    更多
                  </a-button>
                </div>
              </div>
            </template>
          </a-tree>
        </div>
        
        <div style="margin-top: 16px; text-align: right">
          <a-button type="primary" @click="saveRolePermissions" :loading="savingPermissions" :disabled="!selectedRole">
            保存权限
          </a-button>
        </div>
      </a-card>

      <!-- 权限配置弹窗 -->
      <a-modal v-model:open="permissionModalVisible" title="配置权限" width="400px" :confirm-loading="permissionLoading"
        @ok="saveMenuPermissions" @cancel="closePermissionModal">
        <div v-if="currentMenu">
          <h4>菜单：{{ currentMenu.name }}</h4>
          <a-checkbox-group v-model:value="currentMenuPermissions" style="width: 100%">
            <a-row>
              <a-col :span="12" v-for="perm in systemPermissions" :key="perm.value" style="margin-bottom: 8px;">
                <a-checkbox :value="perm.value">
                  {{ perm.label }}
                </a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </div>
      </a-modal>
    </div>

    <!-- 新增/编辑角色弹窗 -->
    <a-modal v-model:open="modalVisible" :title="modalTitle" :confirm-loading="modalLoading" @ok="handleModalOk"
      @cancel="handleModalCancel">
      <a-form :model="roleForm" :rules="roleRules" ref="roleFormRef" :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }">
        <a-form-item label="角色名称" name="name">
          <a-input v-model:value="roleForm.name" placeholder="请输入角色名称" />
        </a-form-item>

        <a-form-item label="角色标识" name="code">
          <a-input v-model:value="roleForm.code" placeholder="请输入角色标识" />
        </a-form-item>

        <a-form-item label="角色描述" name="description">
          <a-textarea v-model:value="roleForm.description" placeholder="请输入角色描述" :rows="3" />
        </a-form-item>

        <a-form-item label="状态" name="status">
          <a-select v-model:value="roleForm.status" placeholder="请选择状态">
            <a-select-option :value="1">正常</a-select-option>
            <a-select-option :value="0">禁用</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </YWrapper>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { message, Modal } from 'ant-design-vue';
import { EllipsisOutlined } from '@ant-design/icons-vue';
import { getRolePage, getAllRoles, saveRole, deleteRole, getRoleDetail } from '@/api/role'
import { getAllMenus } from '@/api/menu'
import { assignRolePermissions, getRolePermissions } from '@/api/permission'
import { buildTree } from '@/utils/buildTree';

const loading = ref(false);
const roleData = ref([]);
const modalVisible = ref(false);
const modalLoading = ref(false);
const modalTitle = ref('');
const roleFormRef = ref();

// 新布局相关变量
const selectedRole = ref(null);
const selectedRoleForm = reactive({
  id: undefined,
  name: '',
  code: '',
  description: '',
  status: 1
});

// 权限配置相关变量
const menuTreeData = ref([]); // 树形结构的菜单数据
const roleMenuPermissions = reactive({}); // 角色-菜单-权限映射 {roleId: {menuId: [permissions]}}
const permissionModalVisible = ref(false);
const permissionLoading = ref(false);
const currentMenu = ref(null); // 当前配置的菜单
const currentMenuPermissions = ref([]); // 当前菜单的权限

const savingRole = ref(false);
const savingPermissions = ref(false);

const searchForm = reactive({
  name: '',
  code: ''
});

const roleForm = reactive({
  id: undefined,
  name: '',
  code: '',
  description: '',
  status: 1
});

const roleRules = {
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  code: [{ required: true, message: '请输入角色标识', trigger: 'blur' }],
  description: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
};

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: total => `共 ${total} 条记录`
});

// 常用权限定义
const commonPermissions = [
  { value: 'view', label: '查看' },
  { value: 'add', label: '新增' },
  { value: 'edit', label: '修改' },
  { value: 'delete', label: '删除' }
];

// 系统权限定义
const systemPermissions = [
  { value: 'view', label: '查看' },
  { value: 'add', label: '新增' },
  { value: 'edit', label: '修改' },
  { value: 'delete', label: '删除' },
  { value: 'export', label: '导出' },
  { value: 'import', label: '导入' }
];

const loadRoles = async () => {
  loading.value = true;
  try {
    const response = await getRolePage(
      { pageNum: pagination.current, limit: pagination.pageSize },
      searchForm
    );
    roleData.value = response.data || [];
    pagination.total = response.total || 0;

    // 自动选择第一个角色
    if (roleData.value.length > 0 && !selectedRole.value) {
      selectRole(roleData.value[0]);
    }
  } catch (error) {
    message.error('加载角色数据失败');
    console.error('加载角色数据失败:', error);
  } finally {
    loading.value = false;
  }
};

const loadMenus = async () => {
  try {
    const response = await getAllMenus();
    const flatData = Array.isArray(response) ? response : response.data || [];
    menuTreeData.value = buildTree(flatData);
  } catch (error) {
    message.error('加载菜单数据失败');
    console.error('加载菜单数据失败:', error);
  }
};

// 选择角色
const selectRole = async (role) => {
  selectedRole.value = role;

  // 更新表单数据
  Object.assign(selectedRoleForm, {
    id: role.id,
    name: role.name,
    code: role.code,
    description: role.description,
    status: role.status || 1
  });

  // 加载角色权限
    try {
      const response = await getRolePermissions({ roleId: role.id });
      const data = response.data || response;

      // 清空并重新构建角色-菜单-权限映射
      Object.keys(roleMenuPermissions).forEach(key => delete roleMenuPermissions[key]);

      // 处理新的权限格式: [{menuId: 1, actions: ['view', 'add']}, ...]
      (data || []).forEach(perm => {
        if (perm.menuId && perm.actions && Array.isArray(perm.actions)) {
          roleMenuPermissions[perm.menuId] = [...perm.actions];
        }
      });
    } catch (error) {
      message.error('获取角色权限失败');
    }
};

// 权限配置相关方法
const openPermissionModal = (menu) => {
  if (!selectedRole.value) return;
  currentMenu.value = menu;
  currentMenuPermissions.value = roleMenuPermissions[menu.id] || [];
  permissionModalVisible.value = true;
};

const closePermissionModal = () => {
  permissionModalVisible.value = false;
  currentMenu.value = null;
  currentMenuPermissions.value = [];
};

// 检查菜单权限是否已选中
const isMenuPermissionChecked = (menuId, permission) => {
  return roleMenuPermissions[menuId]?.includes(permission) || false;
};

// 切换菜单权限
const toggleMenuPermission = (menuId, permission, checked) => {
  if (!selectedRole.value) return;
  
  if (!roleMenuPermissions[menuId]) {
    roleMenuPermissions[menuId] = [];
  }
  
  if (checked) {
    if (!roleMenuPermissions[menuId].includes(permission)) {
      roleMenuPermissions[menuId].push(permission);
    }
  } else {
    const index = roleMenuPermissions[menuId].indexOf(permission);
    if (index > -1) {
      roleMenuPermissions[menuId].splice(index, 1);
    }
  }
};

const saveMenuPermissions = async () => {
  if (!selectedRole.value || !currentMenu.value) return;
  
  permissionLoading.value = true;
  try {
    // 构建单个菜单的权限数据 - 新的格式
    const permissions = [{
      menuId: currentMenu.value.id,
      actions: currentMenuPermissions.value
    }];
    
    await assignRolePermissions({
      roleId: selectedRole.value.id,
      permissions: permissions
    });
    
    // 更新本地权限数据
    roleMenuPermissions[currentMenu.value.id] = [...currentMenuPermissions.value];
    message.success('菜单权限配置成功');
    closePermissionModal();
  } catch (error) {
    console.error('保存菜单权限失败:', error);
    message.error('菜单权限配置失败');
  } finally {
    permissionLoading.value = false;
  }
};

// 批量保存角色权限
const saveRolePermissions = async () => {
  if (!selectedRole.value) return;
  
  savingPermissions.value = true;
  try {
    // 构建权限数据 - 新的格式
    const permissions = [];
    
    // 按menuId分组权限
    Object.keys(roleMenuPermissions).forEach(menuId => {
      const actions = roleMenuPermissions[menuId];
      if (actions && actions.length > 0) {
        permissions.push({
          menuId: parseInt(menuId),
          actions: actions
        });
      }
    });
    
    // 调用批量分配权限接口 - 新的请求体格式
    await assignRolePermissions({
      roleId: selectedRole.value.id,
      permissions: permissions
    });
    message.success('角色权限保存成功');
  } catch (error) {
    console.error('保存角色权限失败:', error);
    message.error('角色权限保存失败');
  } finally {
    savingPermissions.value = false;
  }
};

const handleAdd = () => {
  modalTitle.value = '新增角色';
  roleForm.id = undefined;
  Object.assign(roleForm, {
    name: '',
    code: '',
    description: '',
    status: 1
  });
  modalVisible.value = true;
};

const handleEdit = async (record) => {
  modalTitle.value = '编辑角色';
  try {
      const response = await getRoleDetail({ id: record.id });
      const data = response.data || response;
    roleForm.id = data.id;
    roleForm.name = data.name;
    roleForm.code = data.code;
    roleForm.description = data.description;
    roleForm.status = data.status || 1;
    modalVisible.value = true;
  } catch (error) {
    message.error('获取角色详情失败');
  }
};

const handleDelete = (record) => {
  Modal.confirm({
    title: '确认删除',
    content: `确定要删除角色 "${record.name}" 吗？`,
    okText: '确认',
    cancelText: '取消',
    onOk: async () => {
      try {
        await deleteRole({ id: record.id });
        message.success('删除成功');

        // 如果删除的是当前选中的角色，清除选择
        if (selectedRole.value?.id === record.id) {
          selectedRole.value = null;
          Object.assign(selectedRoleForm, {
            id: undefined,
            name: '',
            code: '',
            description: '',
            status: 1
          });
          // 清空权限数据
          Object.keys(roleMenuPermissions).forEach(key => delete roleMenuPermissions[key]);
        }

        // 重新加载角色列表
        await loadRoles();
      } catch (error) {
        message.error('删除失败');
      }
    }
  });
};

const handlePermission = (record) => {
  selectRole(record);
};

const saveRoleDetail = async () => {
  try {
    await roleFormRef.value.validateFields();
    savingRole.value = true;
    await saveRole(selectedRoleForm);
    message.success('角色保存成功');
    await loadRoles();
  } catch (error) {
    console.error('保存角色失败:', error);
    message.error('角色保存失败');
  } finally {
    savingRole.value = false;
  }
};

const handleSearch = () => {
  pagination.current = 1;
  loadRoles();
};

const handleReset = () => {
  searchForm.name = '';
  searchForm.code = '';
  pagination.current = 1;
  loadRoles();
};

const handleModalOk = async () => {
  try {
    await roleFormRef.value.validateFields();
    modalLoading.value = true;
    await saveRole(roleForm);
    message.success('保存成功');
    modalVisible.value = false;
    await loadRoles();
  } catch (error) {
    console.error('保存失败:', error);
    message.error('保存失败');
  } finally {
    modalLoading.value = false;
  }
};

const handleModalCancel = () => {
  modalVisible.value = false;
};

onMounted(() => {
  loadRoles();
  loadMenus();
});
</script>

<style scoped lang="scss">
.role-list-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.role-list-header {
  flex-shrink: 0;
}

.role-list {
  flex: 1;
  overflow-y: auto;
}

.role-list-item {
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  &.selected {
    background-color: #e6f7ff;
    border-color: #1890ff;
  }
}

.role-detail-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.role-info-card,
.menu-permission-card {
  flex-shrink: 0;
}

.menu-permission-table {
  .permission-header {
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
    font-weight: 500;
    background-color: #fafafa;
    
    .menu-name {
      flex: 1;
      padding-left: 16px;
      min-width: 200px;
    }
    
    .permissions {
      display: flex;
      width: 320px;
      
      .permission-item {
        width: 80px;
        text-align: center;
      }
    }
    
    .actions {
      width: 80px;
      text-align: center;
    }
  }
  
  .permission-tree {
    :deep(.ant-tree-node-content-wrapper) {
      width: 100%;
    }
    
    :deep(.ant-tree-title) {
      width: 100%;
    }
    
    .permission-row {
      display: flex;
      align-items: center;
      padding: 8px 0;
      min-height: 40px;
      
      .menu-name {
        flex: 1;
        padding-left: 8px;
        min-width: 200px;
      }
      
      .permissions {
        display: flex;
        width: 320px;
        
        .permission-item {
          width: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      
      .actions {
        width: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>