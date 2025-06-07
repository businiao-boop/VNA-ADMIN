<script setup lang="ts">
defineOptions({
  name: "ThemeDrewer",
});
import { ref } from 'vue';
import {debounce} from "lodash"
import type { Payload } from '@ckpack/vue-color';

import { useThemeStore } from '@/stores/theme'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue"]);

const themeStore = useThemeStore();
const { themeColors, setElStyle } = themeStore

const wrapperRef = ref(null);
// 建立双向绑定
const open = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const setColor = debounce((property: string, color: string) => {
  setElStyle(property, color)
},500)
const reset = () => {
  themeStore.resetTheme()
}

</script>
<template>
  <div class="theme-drawer-wrapper" ref="wrapperRef">
    <a-drawer v-model:open="open" class="custom-class" root-class-name="root-class-name" title="设置" :width="360"
      :getContainer="wrapperRef">
      <div class="theme-panel">
        <h3 class="title">主题颜色</h3>
        <div class="color-list">
          <div v-for="(color, property) in themeColors" :key="property" class="color-item">
            <span class="color-label">{{ color.name }}</span>
            <div class="item-wrapper">
              <a-popover trigger="click">
                <template #content>
                  <YColorPalette v-model="color.default" @change="(c: Payload) => setColor(property, c.hex8)" />
                </template>
                <div class="color-dot" :style="{ backgroundColor: color.default }" />
              </a-popover>
              <a-input class="color-input" v-model:value="color.default" size="small" />
            </div>
          </div>
        </div>
        <div class="action">
          <a-divider />
          <div class="reset-wrapper">
            <span class="reset-tip">将主题颜色恢复为默认</span>
            <y-button type="default" shape="round" danger size="small" @click="reset">
              <template #prefix>
                <y-icon icon="ReloadOutlined"></y-icon>
              </template>
              重置
            </y-button>
          </div>
        </div>
      </div>
    </a-drawer>
  </div>
</template>


<style scoped lang="scss">
.theme-drawer-wrapper {
  .theme-panel {
    padding: 10px;

    .title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 16px;
      color: #333;
    }

    .color-list {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .color-item {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .color-label {
          width: 80px;
          text-align: right;
          margin-right: 12px;
          font-weight: 500;
          color: #555;
        }

        .item-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f5f5f5;
          padding: 4px 8px;
          border-radius: 8px;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);

          .color-dot {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 1px solid #ccc;
            box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
            cursor: pointer;
          }

          .color-input {
            width: 100px;
          }
        }
      }
    }

    .action {
      text-align: right;
      margin-top: 20px;
      padding: 0 10px;

      .reset-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fafafa;
        border-radius: 8px;
        padding: 10px 12px;
        box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.03);
        transition: all 0.3s;

        .reset-tip {
          font-size: 12px;
          color: var(--color-info);
        }
      }
    }

  }
}
</style>