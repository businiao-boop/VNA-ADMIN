<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  background-color: #f0f2f5;
}

#app {
  height: 100vh;
}
</style>

