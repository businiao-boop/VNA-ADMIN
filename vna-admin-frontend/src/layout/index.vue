<script setup lang="ts">
defineOptions({
  name: "Layout",
});
import Header from "./header/index.vue";
</script>
<template>
  <a-layout class="layout-wrapper">
    <a-layout-header class="layout-header"><Header /></a-layout-header>
    <a-layout-content class="layout-content">Content</a-layout-content>
    <a-layout-footer class="layout-footer">Footer</a-layout-footer>
  </a-layout>
</template>

<style scoped lang="scss">
@import url("./layou.scss");
</style>
