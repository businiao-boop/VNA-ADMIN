<script setup>
defineOptions({
  name: "Role",
});
import { getRolePage, getAllRoles, saveRole, deleteRole, getRoleDetail } from '@/api/role';
import { assignRolePermissions } from "@/api/permission";
import { getAllMenus } from '@/api/menu';
import { buildTree } from '@/utils/buildTree';
import YLoopMenu from './com/YLoopMenu.vue';
import { ref } from 'vue';
import { debounce } from 'lodash';
import { useModal } from '@/hooks/modal/useModal';
import { useMessage } from "@/hooks/message/useMessage";
import { useConfirm } from "@/hooks/confirm/useConfirm";
import EditRoleDialog from './com/editRoleDialog.vue';
const { showModal } = useModal()
const { success } = useMessage();
const { confirmDelete } = useConfirm();

const roleList = ref([]);
const menuTree = ref([])
const searchRoleName = ref('');
const formState = ref(_initFormState());
const loading = ref(false);

function _initFormState() {
  return {
    id: null,
    name: '',
    code: '',
    description: '',
    status: 1,
    permissions: []
  }
}
const handleRowClick = async ({ row }) => {
  if (row && row.id) {
    _info(row.id);
  }
}
// 获取角色详情
async function _info(roleId) {
  if (roleId) {
    loading.value = true;
    const roleRes = await getRoleDetail(roleId);
    if (roleRes) {
      roleRes.permissions = roleRes.permissions.map(item => {
        return {
          menuId: item.menuId,
          actions: item.actions
        }
      });
    }
    formState.value = roleRes;
    loading.value = false;
  }
}
// 获取角色列表
async function listRoleList(roleName) {
  const filter = {
    name: roleName
  }
  const roleRes = await getAllRoles(filter);
  roleList.value = roleRes;
  return roleRes;
}
// 初始化
const init = async () => {
  try {
    const roleRes = await listRoleList();
    if (roleRes && roleRes.length > 0) {
      const firstRole = roleRes[0];
      await _info(firstRole.id);
    }
    loading.value = true;
    const menuRes = await getAllMenus();
    menuTree.value = buildTree(menuRes);
  } finally {
    loading.value = false;
  }

}
init();
// 搜索角色列表
const filterRoleList = debounce((val) => {
  listRoleList(val);
}, 500);


// 删除角色
const handleDelete = (row) => {
  confirmDelete().then(async () => {
    await deleteRole(row.id);
    success("角色删除成功");
    listRoleList();
  })
}
// 分配权限
const assignPermission = async (role) => {
  const { id, permissions } = role;
  const data = {
    roleId: id,
    permissions: permissions
  }
  try {
    loading.value = true;
    await assignRolePermissions(data);
    await _info(formState.value.id);
  } catch {
    loading.value = false;
  }
}
async function openModal(data) {
  const res = await showModal(EditRoleDialog, { formState: data });
  await saveRole(res);
  if (res.id) {
    success("角色新增成功");
  } else {
    success("角色更新成功");
  }
  listRoleList();
}
// 新增角色
const handleAddRole = () => {
  openModal(_initFormState());
}
// 编辑角色
const handleEdit = (role) => {
  openModal(role);
}


</script>

<template>
  <YSplitLayout>
    <template #left>
      <div class="mb-4 flex">
        <div class="flex-1 mr-3">
          <a-input v-model:value="searchRoleName" placeholder="请输入角色名称"
            @change="filterRoleList(searchRoleName)"></a-input>
        </div>
        <div>
          <a-button type="primary" @click="handleAddRole">新增</a-button>
        </div>
      </div>
      <YTable :data="roleList" :round="true" height="calc(100% - 46px)" @cell-click="handleRowClick">
        <template #columns>
          <vxe-column title="角色名称" field="name"></vxe-column>
          <vxe-column title="创建时间" field="createdAt"></vxe-column>
          <vxe-column title="操作" width="100">
            <template #default="{ row }">
              <a-space>
                <button @click.stop="handleEdit(row)" class="text-indigo-600 hover:text-indigo-900">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click.stop="handleDelete(row)" class="text-red-600 hover:text-red-900">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </a-space>
            </template>
          </vxe-column>
        </template>
      </YTable>
    </template>
    <template #right>
      <div class="h-full" v-loading="loading">
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ formState?.name }} - 权限配置</h2>
          <p class="text-gray-600">{{ formState?.description }}</p>
        </div>
        <div style="height: calc(100% - 70px);" class="p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <i class="fa-solid fa-bars mr-2 text-indigo-600"></i>
            <span>
              菜单权限
            </span>
          </h3>
          <div style="max-height: calc(100% - 38.5px - 70px);" class="overflow-y-auto mb-4">
            <YLoopMenu :menus="menuTree" :permissions="formState.permissions" class="mb-4"></YLoopMenu>
          </div>
          <div>
            <a-space>
              <a-button type="primary" @click="assignPermission(formState)">保存</a-button>
              <a-button type="primary">重置</a-button>
            </a-space>
          </div>
        </div>
      </div>
    </template>
  </YSplitLayout>
</template>

<style scoped lang="scss">
.role-wrapper {
}
</style>