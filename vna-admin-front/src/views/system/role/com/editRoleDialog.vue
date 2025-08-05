<script setup lang="ts">
import { computed, reactive } from 'vue';

defineOptions({
  name: "EditRoleDialog",
});
const props = defineProps({
  formState: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['confirm', "cancel"]);

const formData = reactive({
  ...props.formState
})
const rules = ref({
  name: [{ required: true, message: '请输入角色名称' }],
  code: [{ required: true, message: '请输入角色编码' }],
});
const formRef = ref(null);
const handleCancel = () => {
  emit('cancel');
}
const handleConfirm = () => {
  if (formRef.value) {
    formRef.value.validate().then(() => {
      emit('confirm', formData);
    })
  }
}
const isEdit = computed(() => {
  return !!formData.id;
})
const title = computed(() => {
  return isEdit.value ? '编辑角色' : '新增角色';
});

</script>

<template>
  <YModal :title="title">
    <a-form :model="formData" :rules="rules" ref="formRef" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="角色编码" name="code">
        <a-input :disabled="isEdit" v-model:value="formData.code" placeholder="请输入角色编码" />
      </a-form-item>
      <a-form-item label="角色名称" name="name">
        <a-input v-model:value="formData.name" placeholder="请输入角色名称" />
      </a-form-item>
      <a-form-item label="角色描述" name="description">
        <a-textarea v-model:value="formData.description" placeholder="请输入角色描述" />
      </a-form-item>
      <a-form-item label="角色状态" name="status">
        <a-radio-group v-model:value="formData.status" name="status">
          <a-radio :value="1">正常</a-radio>
          <a-radio :value="0">停用</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
    <template #footer>
      <!-- <div> -->
      <a-button @click="handleCancel">取消</a-button>
      <a-button type="primary" @click="handleConfirm">确定</a-button>
      <!-- </div> -->
    </template>
  </YModal>
</template>

<style scoped lang="scss">
.compoent-wrapper {}
</style>