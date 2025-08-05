<script setup lang="ts">
import { computed, reactive } from 'vue';
import { getAllMenus, saveMenu, deleteMenu, getMenuDetail } from '@/api/menu';
import { MENU_TYPE_OPTIONS, ENABLE_STATUS_OPTIONS, MENU_SHOW_OPTIONS } from "@/constants/options"
import { buildTree } from "@/utils/buildTree";
defineOptions({
  name: "EditMenuDialog",
});
const props = defineProps({
  formState: {
    type: Object,
    default: () => ({})
  }
})
const emit = defineEmits(["confirm", "cancel"]);
const isEdit = computed(() => {
  return props.formState.id;
})
const title = computed(() => {
  return isEdit.value ? "编辑菜单" : "新增菜单";
});
const formData = reactive({ ...props.formState });
const rules = {
  name: [{ required: true, message: '请输入菜单名称' }],
}
const menuTree = ref([]);
const loading = ref(false);
const formRef = ref(null);
const loadMenus = async () => {
  const response = await getAllMenus();
  const flatData = Array.isArray(response) ? response : response.data || [];
  menuTree.value = buildTree(flatData);

};
loadMenus()
const handleOk = () => {
  formRef.value.validate().then(() => {
    loading.value = true;
    saveMenu(formData).then(() => {
      emit("confirm", formData);
    }).finally(() => {
      loading.value = false;
    })
  })
}
const handleCancel = () => {
  emit("cancel");
}

</script>

<template>
  <YModal :title="title" :width="600">
    <a-form :model="formData" :rules="rules" ref="formRef" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="菜单类型" name="type">
        <a-radio-group v-model:value="formData.type" :options="MENU_TYPE_OPTIONS" />
      </a-form-item>
      <a-form-item label="父级菜单" name="parentId">
        <a-tree-select v-model:value="formData.parentId" :tree-data="menuTree" placeholder="请选择父级菜单"
          :field-names="{ children: 'children', label: 'title', value: 'id' }" allowClear showSearch />
      </a-form-item>
      <a-form-item label="菜单名称" name="title">
        <a-input v-model:value="formData.title" />
      </a-form-item>
      <a-form-item label="路由名称" name="name">
        <a-input v-model:value="formData.name" />
      </a-form-item>
      <a-form-item label="菜单路径" name="path">
        <a-input v-model:value="formData.path" />
      </a-form-item>
      <a-form-item label="菜单组件" name="component">
        <a-input v-model:value="formData.component" />
      </a-form-item>
      <a-form-item label="菜单排序" name="sort">
        <a-input v-model:value="formData.sort" />
      </a-form-item>
      <a-form-item label="菜单图标" name="icon">
        <a-input v-model:value="formData.icon" />
      </a-form-item>
      <a-form-item label="菜单状态" name="status">
        <a-radio-group v-model:value="formData.status" :options="ENABLE_STATUS_OPTIONS" />
      </a-form-item>

      <a-form-item label="是否显示" name="show">
        <a-radio-group v-model:value="formData.show" :options="MENU_SHOW_OPTIONS" />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button @click="handleCancel">取消</a-button>
      <a-button type="primary" @click="handleOk" :loading="loading">确定</a-button>
    </template>
  </YModal>
</template>

<style scoped lang="scss">
.compoent-wrapper {}
</style>