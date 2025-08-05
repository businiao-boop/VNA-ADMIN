<script setup lang="ts">
defineOptions({
  name: "YBaseLayout",
});

defineProps({
  title: {
    type: String,
    default: ''
  }
})

</script>

<template>
  <!-- <div class="y-base-layout h-full flex flex-col bg-white px-6">
    <div class="flex justify-between w-full py-4 align-center">
      <span class="text-lg font-bold">{{ title }}</span>
      <slot name="header"></slot>
    </div>
    <div class="flex-1 pb-4">
      <slot></slot>
    </div>
  </div> -->
  <a-card class="y-base-layout h-full flex flex-col" :title="title">
    <template #extra>
      <slot name="header"></slot>
    </template>
    <slot></slot>
  </a-card>
</template>

<style scoped lang="scss">
.y-base-layout {
  :deep(.ant-card-body) {
    @apply flex-1;
  }
}
</style>