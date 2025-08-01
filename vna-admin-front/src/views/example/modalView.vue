<script setup>
defineOptions({
  name: "ModalView",
});
import { reactive } from 'vue';
// const emit = defineEmits(['confirm']);
const formModel = reactive({
  name: '',
});
const rules = reactive({
  name: [{ required: true, message: '请输入姓名' }],
});
const handleCancel = () => {
  // emit('confirm', false);
}
</script>

<template>
  <YModal>
    <a-form :model="formModel" :rules="rules">
      <a-form-item label="Name" prop="name">
        <a-input v-model:value="formModel.name" />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button type="primary" @click="handleCancel">Ok1</a-button>
    </template>
  </YModal>
</template>

<style scoped lang="scss">
.modal-view {}
</style>