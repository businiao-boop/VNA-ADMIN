<template>
  <div>
    <a-form :modal="modalValue">
      <a-form-item name="a" label="a">
        <a-input v-model:value="modalValue.a"></a-input>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
defineProps({
  modalValue: { type: Object, default: {} },
});

</script>
<style scoped lang="scss"></style>
