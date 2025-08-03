<script setup>
defineOptions({
  name: "YSplitLayout",
});

</script>

<template>
  <div class="y-split-layout h-full flex bg-white">
    <div class="w-1/3 h-full border-r border-gray-200 p-4">
      <slot name="left"></slot>
    </div>
    <div class="flex-1 h-full p-4">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.y-split-layout {
  &.ant-btn-default {
    @apply bg-white;
  }
}
</style>