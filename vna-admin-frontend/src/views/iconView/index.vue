<script setup lang="ts">
defineOptions({
  name: "IconView"
});

import iconfontJson from "@/assets/iconfont/iconfont.json";
import { message } from 'ant-design-vue'

const keyword = ref('')
const icons = iconfontJson.glyphs || [];

const filteredIcons = computed(() =>
  icons.filter(i => i.name.includes(keyword.value))
)

const copy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    message.success(`已复制: ${text}`)
  } catch (e) {
    message.error('复制失败')
  }
}

</script>

<template>
  <y-page-layout mode="vertical" class="icon-view-wrapper">
    <template #toolbar>
      <a-input
        v-model:value="keyword"
        placeholder="搜索图标名称"
        allow-clear
        style=" max-width: 300px"
      />
    </template>
    <ul>
      <li v-for="icon in filteredIcons"
        :key="icon.font_class"
        :span="4"
        class="text-center mb-4"
        @click="copy('icon-'+icon.font_class)">
        <i :class="['iconfont', 'icon-' + icon.font_class]" style="font-size: 24px;" />
        <div class="mt-1 text-sm text-gray-500">{{ icon.name }}
        </div>
      </li>
    </ul>
    
  </y-page-layout>
</template>

<style scoped lang="scss">
.icon-view-wrapper {
  padding: 16px;

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 16px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  li {
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    padding: 12px 8px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: #1890ff;
      box-shadow: 0 2px 8px rgba(24, 144, 255, 0.2);
      transform: translateY(-2px);
    }

    i {
      display: block;
      font-size: 28px;
      color: #555;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .text-sm {
      font-size: 12px;
      color: #999;
      margin-top: 6px;
      word-break: break-all;
    }
  }
}

</style>