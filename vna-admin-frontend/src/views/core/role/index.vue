<script setup lang="ts">
defineOptions({ name: "Role" });

import { ref } from "vue";
import { message } from "ant-design-vue";
import { presetFields } from "./settings";
import { saveRole, listRole, infoRole } from "@/api/role";
import { listRelationRequestPermission } from "@/api/menu";
import {TreeEventType} from "@/types/components/yTree";
import type {
  RoleTypeDto,
  RoleInfoDto,
  RoleListDto
} from "@/types/modules/role.type";
import type {
  MenuInfoDto
} from "@/types/modules/menu.type";

const roleList = ref<RoleListDto[]>([]);
const menuList = ref<(MenuInfoDto & { key: number })[]>([]);
const selectedNodes = ref<any[]>([]);
const checkedKeys = ref<any[]>([]);
const formRef = ref();
const formData = ref<RoleInfoDto>({ ...presetFields });

const rules = {
  name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
  code: [{ required: true, message: "请输入唯一标识", trigger: "blur" }]
};

// 展平菜单和权限结构，转换为带 key/label 的扁平结构
function flattenPermissions(data: MenuInfoDto[]) {
  const flatList: any[] = [];
  data.forEach(menu => {
    flatList.push({
      ...menu,
      key: menu.id,
      label: menu.menuName,
      _nodeType: "menu"
    });

    menu.permissions?.forEach((permission, idx) => {
      flatList.push({
        ...permission,
        key: `${menu.id}-${permission.id}`,
        parentId: menu.id,
        label: permission.name,
        sort: idx,
        _nodeType: "permission"
      });
    });
  });
  return flatList;
}

// 初始化数据
async function initData() {
  const menuData = await listRelationRequestPermission();
  if (menuData) {
    menuList.value = flattenPermissions(menuData);
  }
  const roleData = await listRole();
  if (roleData) {
    roleList.value = roleData;
  }
};
initData();
// 选中角色时加载详细信息
async function handleSelectRole(role: RoleTypeDto) {
  if (!role.id) return;
  const detail = await infoRole(role.id);
  if (!detail) return;

  formData.value = detail;
  selectedNodes.value = flattenPermissions(detail.menuList);
  checkedKeys.value = selectedNodes.value
    .filter(i => i._nodeType === "permission")
    .map(i => i.key);
}

// 处理菜单树勾选事件
function handleCheckTree({ halfCheckedKeys, checkedNodes }:TreeEventType) {
  const permissions = checkedNodes.filter(n => n._nodeType === "permission");
  const menus = checkedNodes.filter(n => n._nodeType === "menu");
  const halfSelectedMenus = halfCheckedKeys
    .map((key: any) => menuList.value.find(menu => menu.key == key))
    .filter(Boolean);
  selectedNodes.value = [...permissions, ...menus, ...halfSelectedMenus];
}

// 提交表单
function handleSaveRole() {
  console.log(selectedNodes.value);
  
  const copyNodes:(MenuInfoDto & {_nodeType:string})[] = JSON.parse(JSON.stringify(selectedNodes.value));
  const permissionNodes:MenuInfoDto[] = copyNodes.filter(n => n._nodeType === "permission");
  const menuNodes = copyNodes.filter(n => n._nodeType === "menu");

  const permissionMap = new Map<number, any[]>();
  permissionNodes.forEach(p => {
    if (!permissionMap.has(p.parentId)) {
      permissionMap.set(p.parentId, []);
    }
    permissionMap.get(p.parentId)?.push(p);
  });

  // 将权限挂载到对应菜单下
  for (const [menuId, perms] of permissionMap.entries()) {
    const menu = menuNodes.find(m => m.id == menuId);
    if (menu) {
      menu.permissions = perms;
    }
  }

  formRef.value.validate().then(() => {
    const payload = {
      ...formData.value,
      menuList: menuNodes
    };
    saveRole(payload).then(res => {
      if (res) {
        message.success("保存成功");
        initData();
      }
    });
  });
}
</script>

<template>
  <y-page-layout mode="horizontal" class="role-wrapper">
    <template #left>
      <h3 class="role-list-title">权限列表</h3>
      <ul class="role-list">
        <li
          v-for="item in roleList"
          :key="item.id"
          @click="handleSelectRole(item)"
        >
          <span :title="item.name">{{ item.name }}</span>
        </li>
      </ul>
    </template>

    <template #toolbar>
      <a-space>
        <y-button type="primary" @click="handleSaveRole">添加</y-button>
      </a-space>
    </template>

    <a-form ref="formRef" :model="formData" layout="vertical" :rules="rules">
      <a-form-item label="唯一标识" name="code">
        <a-input
          v-model:value="formData.code"
          :disabled="!!formData.id"
          placeholder="请输入唯一标识"
        />
      </a-form-item>
      <a-form-item label="角色名称" name="name">
        <a-input v-model:value="formData.name" placeholder="请输入角色名称" />
      </a-form-item>
      <a-form-item label="角色描述" name="description">
        <a-input v-model:value="formData.description" placeholder="请输入描述" />
      </a-form-item>

      <a-form-item label="菜单权限">
        <y-tree
          v-model="checkedKeys"
          :options="menuList"
          :height="300"
          rowField="key"
          labelField="label"
          :transform="true"
          :expandLayer="2"
          :checkable="true"
          :checkParentOnSelect="true"
          @check="handleCheckTree"
        />
      </a-form-item>
    </a-form>
  </y-page-layout>
</template>

<style scoped lang="scss">
.role-wrapper {
  .role-list-title {
    padding-bottom: 20px;
  }
  .role-list {
    li {
      cursor: pointer;
      padding: 5px;
      &:hover {
        background-color: #f5f7fa;
      }
    }
  }

  .y-tree {
    .tree-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 10px;

      .tree-item-toolbar {
        display: none;
        font-size: 22px;
        .iconfont {
          transition: all 0.3s;
          &:hover {
            transform: scale(1.1);
          }
        }
      }

      &:hover .tree-item-toolbar {
        display: block;
      }
    }

    .ant-tree-node-selected {
      .tree-item-toolbar {
        display: block;
      }
    }
  }
}
</style>
