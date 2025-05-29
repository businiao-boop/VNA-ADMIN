<script setup lang="ts">
defineOptions({
  name: 'Layout',
})
import Header from './header/index.vue'
</script>
<template>
  <el-container>
    <el-header>
      <Header />
    </el-header>
    <el-main>Main</el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<style scoped lang="less"></style>
