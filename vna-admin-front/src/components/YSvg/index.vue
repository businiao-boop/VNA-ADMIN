<template>
  <div v-if="iconUrl" class="svg-icon-wrapper" :style="wrapperStyle">
    <img v-if="useImg" :src="iconUrl" :class="iconClass" :alt="alt" :width="size" :height="size" @error="handleError" />
    <div v-else :class="iconClass" :style="svgStyle" v-html="svgContent" />
  </div>
  <div v-else class="svg-icon-fallback" :style="fallbackStyle">
    <span>{{ iconName?.charAt(0)?.toUpperCase() || '?' }}</span>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";

/**
 * SvgIcon组件 - 支持外部SVG文件的图标组件
 * @description 从src/assets/icons目录加载SVG图标文件
 */

const props = defineProps({
  /**
   * 图标名称（对应文件名，不带扩展名）
   */
  name: {
    type: String,
    required: true
  },

  /**
   * 图标大小
   */
  size: {
    type: [String, Number],
    default: 24
  },

  /**
   * 图标颜色
   */
  color: {
    type: String,
    default: "currentColor"
  },

  /**
   * 自定义CSS类名
   */
  className: {
    type: String,
    default: ""
  },

  /**
   * 是否使用img标签加载（兼容性更好）
   */
  useImg: {
    type: Boolean,
    default: false
  },

  /**
   * 替代文本
   */
  alt: {
    type: String,
    default: ""
  },

  /**
   * 图标目录路径
   */
  iconDir: {
    type: String,
    default: "/src/assets/icons"
  },
  /**
   * 图标鼠标悬停样式
   */
  cursor: {
    type: String,
    default: "pointer"
  }
});

// 响应式数据
const svgContent = ref("");
const loadError = ref(false);

/**
 * 计算图标URL
 */
const iconUrl = computed(() => {
  if (loadError.value) return null;
  return `${props.iconDir}/${props.name}.svg`;
});

/**
 * 计算图标名称
 */
const iconName = computed(() => props.name);

/**
 * 计算图标CSS类
 */
const iconClass = computed(() => {
  const classes = ["svg-icon"];
  if (props.className) {
    classes.push(props.className);
  }
  return classes.join(" ");
});

/**
 * 计算包装器样式
 */
const wrapperStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  color: props.color,
  cursor: props.cursor
}));

/**
 * 计算SVG样式
 */
const svgStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  color: props.color,
  fill: "currentColor",
}));

/**
 * 计算回退样式
 */
const fallbackStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  backgroundColor: "#e5e7eb",
  color: "#6b7280",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: `${Math.floor(props.size / 2)}px`,
  fontWeight: "bold",
  borderRadius: "4px"
}));

/**
 * 加载SVG文件内容
 */
const loadSvg = async () => {
  if (props.useImg) return;

  try {
    const response = await fetch(`/src/assets/icons/${props.name}.svg`);
    if (response.ok) {
      let content = await response.text();

      // 设置SVG属性
      content = content.replace(
        /<svg/i,
        `<svg width="${props.size}" height="${props.size}" style="color: ${props.color}"`
      );

      svgContent.value = content;
      loadError.value = false;
    } else {
      loadError.value = true;
    }
  } catch (error) {
    console.error(`加载SVG图标失败: ${props.name}`, error);
    loadError.value = true;
  }
};

/**
 * 处理加载错误
 */
const handleError = () => {
  loadError.value = true;
};

/**
 * 监听图标名称变化
 */
watch(() => props.name, () => {
  loadError.value = false;
  if (!props.useImg) {
    loadSvg();
  }
});

// 组件挂载时加载SVG
onMounted(() => {
  if (!props.useImg) {
    loadSvg();
  }
});
</script>

<style scoped>
.svg-icon-wrapper {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}

.svg-icon {
  display: block;
  width: 100%;
  height: 100%;
  transition: all 0.2s ease-in-out;
}

.svg-icon:hover {
  transform: scale(1.1);
}

.svg-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.svg-icon-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
</style>