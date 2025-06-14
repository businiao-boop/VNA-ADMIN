<script setup lang="ts">
defineOptions({
  name: "YModal",
});
import { ref } from "vue";
const props = defineProps({
  open: {
    type: Boolean,
    default:true
  },
  width:{
    type:[String , Number],
    default:800
  }
});
const visible = ref(props.open);
const emits = defineEmits(["ok", "cancel"]);
const ok = () => {
  emits("ok");
};
</script>
<template>
  <a-modal :open="visible" @ok="ok" @cancel="visible = false" v-bind="$attrs" :width="width" :maskClosable="false">
    <slot />
  </a-modal>
</template>

<style scoped lang="less"></style>
