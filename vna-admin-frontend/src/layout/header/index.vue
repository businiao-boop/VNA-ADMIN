<script setup lang="ts">
defineOptions({
  name: "Header",
});
import Menu from "../menu/index.vue";

import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

</script>
<template>
  <div class="header">
    <Menu :menus="userStore.routes" />
  </div>
</template>

<style scoped lang="less"></style>
