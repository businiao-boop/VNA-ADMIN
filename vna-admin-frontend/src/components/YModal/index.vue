<script setup lang="ts">
defineOptions({
  name: "YModal",
});
const props = defineProps({
  open: Boolean,
});
const visible = ref(props.open);
const emits = defineEmits(["ok", "cancel"]);
const ok = () => {
  visible.value = false;
  emits("ok");
};
</script>
<template>
  <a-modal :open="visible" :footer="null">
    <template #title>
      <slot name="title"></slot>
    </template>
    <slot />
    <slot name="footer">
      <a-space>
        <a-button>取消</a-button>
        <a-button type="primary" @click="ok">确定</a-button>
      </a-space>
    </slot>
  </a-modal>
</template>

<style scoped lang="less"></style>
