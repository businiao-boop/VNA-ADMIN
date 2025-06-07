<script setup lang="ts">
defineOptions({
  name: "YPageLayout",
});
defineProps({
  title:{type: String, default: ""}
});
</script>

<template>
  <a-card :title="title" :bordered="false" class="y-page-layout-wrapper">
    <slot></slot>
  </a-card>
</template>

<style scoped lang="scss">
.y-page-layout-wrapper {
  box-shadow: none;
  :deep(.ant-card-body){
    padding-top: 10px;
  }
}
</style>