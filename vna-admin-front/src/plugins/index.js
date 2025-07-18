import GlobalComponents from './global-components'
import antdV from './antdV'

const plugins = [
  GlobalComponents,
  antdV
]

export default {
  install(app) {
    plugins.forEach((plugin) => {
      if (typeof plugin === 'function') {
        plugin(app)             // 函数形式插件
      } else if (plugin?.install) {
        app.use(plugin)         // 普通 Vue 插件对象
      }
    })
  },
}
