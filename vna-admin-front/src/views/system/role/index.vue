<script setup>
defineOptions({
  name: "Role",
});
import { getRolePage, getAllRoles, saveRole, deleteRole, getRoleDetail } from '@/api/role';
import { getAllMenus } from '@/api/menu';
import { buildTree } from '@/utils/buildTree';
import YLoopMenu from './com/YLoopMenu.vue';
import { ref } from 'vue';
const roleList = ref([]);
const menuTree = ref([])
const searchRoleName = ref('');
const selectedRole = ref(null);

const handleRowClick = async ({ row }) => {
  if (row && row.id) {
    const roleRes = await getRoleDetail(row.id);
    selectedRole.value = roleRes;
  }
}

const init = async () => {
  const roleRes = await getAllRoles();
  if (roleRes && roleRes.length > 0) {
    handleRowClick({ row: roleRes[0] })
  }
  const menuRes = await getAllMenus();
  roleList.value = roleRes;
  menuTree.value = buildTree(menuRes);

}
init();
const search = () => { }
const handleEdit = () => { }
const handleDelete = () => { }
const handleAddRole = () => {
}


</script>

<template>
  <YSplitLayout>
    <template #left>
      <div class="mb-4 flex">
        <div class="flex-1 mr-3">
          <a-input v-model:value="searchRoleName" placeholder="请输入角色名称"></a-input>
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
                <button @click="handleDelete(row)" class="text-red-600 hover:text-red-900">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </a-space>
            </template>
          </vxe-column>
        </template>
      </YTable>
    </template>
    <template #right>
      <div class="h-full">
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ selectedRole?.name }} - 权限配置</h2>
          <p class="text-gray-600">{{ selectedRole?.description }}</p>
        </div>
        <div style="height: calc(100% - 70px);" class="p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <YSvg name="list" size="18" color="#6366f1" class="mr-2"></YSvg>
            <span>
              菜单权限
            </span>
          </h3>
          <div style="max-height: calc(100% - 38.5px - 70px);" class="overflow-y-auto mb-4">
            <YLoopMenu :menus="menuTree" class="mb-4"></YLoopMenu>
          </div>
          <div>
            <a-space>
              <a-button type="primary">保存</a-button>
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