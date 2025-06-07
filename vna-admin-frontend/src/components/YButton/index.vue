<script setup lang="ts">
defineOptions({
  name: "YButton",
  // inheritAttrs: false,// 阻止组件内部元素透传
});

</script>

<template>
    <a-button v-bind="$attrs">
      <slot name="prefix" />
      <slot></slot>
      <slot name="suffix" />
    </a-button>
</template>

<style scoped lang="scss">
.ant-btn-primary{
  background-color: var(--color-secondary);
  &:hover{
    background-color: var(--color-secondary-hover);
  }
}
.ant-btn-dangerous{
  background-color: var(--color-danger);
  border-color: var(--color-danger);
  &:hover{
    background-color: var(--color-danger);
    background-color: var(--color-danger-hover);
    border-color: var(--color-danger) !important;
  }
}
</style>