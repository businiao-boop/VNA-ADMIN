<script setup>
defineOptions({
  name: "Role",
});
import { getRolePage, getAllRoles, saveRole, deleteRole, getRoleDetail } from '@/api/role';
import { ref } from 'vue';
const roleList = ref([]);
const searchRoleName = ref('');
const selectedRole = ref(null);
const init = async () => {
  const res = await getAllRoles();
  roleList.value = res.data;
}
init();
const search = () => { }
const handleEdit = () => { }
const handleDelete = () => { }
const handleRowClick = async ({ row }) => {
  if (row && row.id) {
    const roleRes = await getRoleDetail(row.id);
    selectedRole.value = roleRes;
  }
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
          <a-button type="primary" @click="search">查询</a-button>
        </div>
      </div>
      <YTable :data="roleList" :round="true" height="calc(100% - 46px)" @cell-click="handleRowClick">
        <template #columns>
          <vxe-column title="角色名称" field="name"></vxe-column>
          <vxe-column title="创建时间" field="createdAt"></vxe-column>
          <vxe-column title="操作">
            <template #default="{ row }">
              <a-space>
                <YSvg name="edit" size="18" color="#6366f1" @click.stop="handleEdit(row)" />
                <YSvg name="trash" size="18" color="#ef4444" @click="handleDelete(row)" />
              </a-space>
            </template>
          </vxe-column>
        </template>
      </YTable>
    </template>
    <template #right>
      <div>
        <div class="mb-4">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ selectedRole?.name }} - 权限配置</h2>
          <p class="text-gray-600">{{ selectedRole?.description }}</p>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <YSvg name="list" size="18" color="#6366f1" class="mr-2"></YSvg>
            <span>
              菜单权限
            </span>
          </h3>
          <a-list></a-list>
        </div>
      </div>
    </template>
  </YSplitLayout>
</template>

<style scoped lang="scss">
.role-wrapper {
}
</style>