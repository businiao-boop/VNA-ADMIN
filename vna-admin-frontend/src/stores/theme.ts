// stores/theme.ts
import { defineStore } from 'pinia'
type Theme = Record<string, {
  name: string
  description: string
  default: string
}>
const themeColors: Theme = {
  "--color-primary": {
    name: "主色调",
    description: "主色（主按钮、品牌色、樱花粉红）",
    default: "#ff6f91"
  },
  "--color-primary-hover": {
    name: "主色悬停",
    description: "主按钮悬停时的颜色",
    default: "#ff8fa7"
  },
  "--color-secondary": {
    name: "次色调",
    description: "次要色（图标、hover 效果等）",
    default: "#ff9671"
  },
  "--color-secondary-hover": {
    name: "次色悬停",
    description: "次要按钮或元素悬停时的颜色",
    default: "#ffb194"
  },
  "--color-success": {
    name: "成功色",
    description: "成功状态显示色",
    default: "#3ccfcf"
  },
  "--color-warning": {
    name: "警告色",
    description: "警告状态显示色（柠檬黄）",
    default: "#ffc75f"
  },
  "--color-danger": {
    name: "错误色",
    description: "错误/失败状态色（红橙）",
    default: "#ff6f61"
  },
  "--color-info": {
    name: "信息色",
    description: "信息状态或提示色（辅助蓝）",
    default: "#6aafe6"
  },
  "--color-background": {
    name: "背景色",
    description: "全局背景色（明亮）",
    default: "#f9f871"
  },
  "--color-surface": {
    name: "表面色",
    description: "卡片背景、浮层背景色",
    default: "#fff5f8"
  },
  "--color-text": {
    name: "主文本色",
    description: "主文本内容颜色",
    default: "#2e2e2e"
  }
}


export const useThemeStore = defineStore('theme', {
  state: (): { themeColors: Theme } => ({
    themeColors: { ...themeColors }
  }),
  actions: {
    setPrimaryColor(property: string, value: string) {
      this.themeColors[property].default = value
      document.documentElement.style.setProperty(property, value)
    },
    resetTheme() {
      Object.keys(themeColors).forEach((property: string) => {
        this.setPrimaryColor(property, themeColors[property].default)
      })
    }
  }
})
