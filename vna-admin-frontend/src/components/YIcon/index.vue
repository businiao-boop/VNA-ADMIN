<template>
  <!-- 字体图标 -->
  <i
    v-if="isIconFont"
    :class="['iconfont', icon]"
    :style="{ fontSize: size + 'px' }"
  />

  <!-- Ant Design 图标 -->
  <component
    v-else-if="isAntIcon"
    :is="component"
    :style="{ fontSize: size + 'px' }"
  />

  <!-- 本地 SVG 图标 -->
  <component
    v-else-if="isSvg"
    :is="component"
    class="svg-icon"
    :viewBox="viewBox"
    :style="{ width: width, height: height }"
  />
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import * as AntIcons from '@ant-design/icons-vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'

defineOptions({ name: 'YIcon' })

const props = withDefaults(
  defineProps<{
    icon?: string     // iconfont 或 Ant Icon 名
    svg?: string      // 本地 svg 文件名
    size?: number     // 图标大小
    width?: string;
    height?: string;
    viewBox?:string;
  }>(),
  {
    size: 16,
    width: '100%',
    height: '100%',
    viewBox: '0 0 1024 1024'
  }
)

const component = shallowRef<any>(QuestionCircleOutlined)
const isIconFont = ref(false)
const isAntIcon = ref(false)
const isSvg = ref(false)

watchEffect(async () => {
  isIconFont.value = false
  isAntIcon.value = false
  isSvg.value = false

  if (props.svg) {
    // 优先使用本地 svg
    try {
      const mod = await import(`@/assets/icons/${props.svg}.svg`)
      component.value = mod.default
      isSvg.value = true
    } catch (e) {
      console.warn(`未找到 SVG 图标: ${props.svg}`)
      component.value = QuestionCircleOutlined
    }
  } else if (props.icon?.startsWith('icon-')) {
    // iconfont 图标（如 icon-user）
    isIconFont.value = true
  } else if (props.icon) {
    // Ant Design 图标（如 HomeOutlined）
    const found = (AntIcons as Record<string, any>)[props.icon]
    if (found) {
      component.value = found
      isAntIcon.value = true
    } else {
      component.value = QuestionCircleOutlined
    }
  } else {
    component.value = QuestionCircleOutlined
  }
})
</script>

<style scoped lang="scss">
.iconfont {
  display: inline-block;
  cursor: pointer;
}

</style>
