// types/iconfont.d.ts
declare module '@/assets/iconfont/iconfont.json' {
  interface IconItem {
    font_class: string;
    name: string;
    unicode: string;
    // 你可以加更多字段
  }

  const data: {
    glyphs: IconItem[];
    // 还有其他字段的话可以继续补充
  };

  export default data;
}
