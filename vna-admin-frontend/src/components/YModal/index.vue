<script setup lang="ts">
defineOptions({
  name: "YModal",
});
import { ref } from "vue";
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
  <a-modal :open="visible" @ok="ok" @cancel="visible = false" v-bind="$attrs">
    <slot />
  </a-modal>
</template>

<style scoped lang="less"></style>
