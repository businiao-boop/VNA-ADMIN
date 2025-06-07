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
    default: "#ff9671"
  },
  "--color-secondary": {
    name: "次色调",
    description: "次要色（图标、hover 效果等）",
    default: "#ff6f91"
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
  "--color-text": {
    name: "主文本色",
    description: "主文本内容颜色",
    default: "#2e2e2e"
  }
}
function hexToRgba(hex: string, alpha = 1): string {
  // 去除 # 号
  hex = hex.replace(/^#/, '');

  // 支持 3 位简写
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }

  if (hex.length < 6) {
    throw new Error('Invalid HEX color.');
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}



export const useThemeStore = defineStore('theme', {
  state: (): { themeColors: Theme } => ({
    themeColors: JSON.parse(JSON.stringify(themeColors)) 
  }),
  actions: {
    setThemeColors(property: string, value: string) { 
      this.themeColors[property].default = value
    },

    setElStyle(property: string, value: string) {
      document.documentElement.style.setProperty(property, value);
      const hoverColor = hexToRgba(value, .7);
      document.documentElement.style.setProperty(property + "-hover", hoverColor);
    },

    resetTheme() {
      Object.keys(themeColors).forEach((property: string) => {
        this.setThemeColors(property, themeColors[property].default);
        this.setElStyle(property, themeColors[property].default);
      })
    }
  }
})
