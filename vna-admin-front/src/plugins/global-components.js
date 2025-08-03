import YSplitLayout from '@/components/Layouts/YSplitLayout.vue'
export default {
  install(app) {
    // Register other common components
    const modules = import.meta.glob('@/components/**/index.vue', { eager: true })
    Object.entries(modules).forEach(([path, module]) => {
      const component = module.default;
      const match = path.match(/..\/components\/(.*?)\/index\.vue$/)
      if (match) {
        const dirName = component.name || match[1]
        app.component(dirName, component)
      }
    })
    app.component('YSplitLayout', YSplitLayout)
  }
}
