<script setup lang="ts">
defineOptions({
  name: "YButton",
  // inheritAttrs: false,// 阻止组件内部元素透传
});

</script>

<template>
    <a-button v-bind="$attrs" class="y-button">
      <slot name="prefix" />
      <slot></slot>
      <slot name="suffix" />
    </a-button>
</template>
