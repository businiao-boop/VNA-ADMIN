<script setup lang="ts">
defineOptions({
  name: "Header",
});
import { useUserStore } from "@/stores/user";
import Menu from "../menu/index.vue";

const userStore = useUserStore();
</script>
<template>
  <div class="header">
    <Menu :menus="userStore.routes" />
  </div>
</template>

<style scoped lang="less"></style>
