<script setup>
defineOptions({
  name: "YModal",
});
import { ref, watch } from 'vue';
const props = defineProps({
  title: {
    type: String,
    default: 'Modal Title',
  },
});

const emit = defineEmits(["confirm", "cancel", "close"]);

const handleConfirm = () => {
  emit('confirm', true);
}

const handleCancel = () => {
  emit('cancel');
}
const handleClose = () => {
  emit("close");
}

</script>

<template>
  <a-modal v-bind="{ open: true, title }" @cancel="handleClose" :maskClosable="false">
    <template #header>
      <div>
        <slot name="header">
          <span>{{ title }}</span>
        </slot>
      </div>
    </template>
    <slot name="default"></slot>
    <template #footer>
      <slot name="footer">
        <div>
          <a-button @click="handleCancel">取消</a-button>
          <a-button type="primary" @click="handleConfirm">确定</a-button>
        </div>
      </slot>
    </template>
  </a-modal>
</template>

<style scoped lang="scss">
.y-modal {}
</style>