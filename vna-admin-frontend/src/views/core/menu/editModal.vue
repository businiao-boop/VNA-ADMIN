<template>
  <div>
    <a-form :modal="modalValue">
      <a-form-item name="a" label="a">
        <a-input v-model:value="modalValue.a"></a-input>
      </a-form-item>
    </a-form>
    <a-space slot="footer">
      <a-button type="primary" @click="handleOk">确定111</a-button>
      <a-button>取消</a-button>
    </a-space>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  modalValue: { type: Object, default: {} },
});
const $emit = defineEmits(["submit"]);
const handleOk = () => {
  $emit("submit", props.modalValue);
};
</script>
<style scoped lang="scss"></style>
