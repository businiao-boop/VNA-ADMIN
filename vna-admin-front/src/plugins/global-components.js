export default {
  install(app) {
    const modules = import.meta.glob('@/components/**/index.vue', { eager: true })
    Object.entries(modules).forEach(([path, module]) => {
      const component = module.default;
      // 取目录名作为组件名，例如 ../components/Button/index.vue → Button
      const match = path.match(/..\/components\/(.*?)\/index\.vue$/)
      if (match) {
        const dirName = component.name || match[1]
        app.component(dirName, component)
      }
    })
  }
}
