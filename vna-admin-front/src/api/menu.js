import service from "@/utils/request"

/**
 * 分页查询菜单数据
 * @param {Object} query 查询参数
 * @param {Object} data 请求体（查询条件）
 * @param {Number} query.pageNum 页码
 * @param {Number} query.limit 每页条数
 * @returns {Promise} 返回分页数据 { data, total }
 */
export function getMenuPage(query = {}, data = {}) {
  return service({
    url: "/menu/page",
    method: "POST",
    params: {
      pageNum: query.pageNum || 1,
      limit: query.limit || 10
    },
    data: {
      ...data
    }
  })
}

/**
 * 查询所有菜单数据（包含ID为0的根菜单，不分页）
 * @param {Object} data 查询条件
 * @returns {Promise} 返回所有菜单数据
 */
export function getAllMenus(data = {}) {
  return service({
    url: "/menu/list",
    method: "POST",
    data
  })
}

/**
 * 获取菜单树
 * @param {Object} data 查询条件
 * @returns {Promise} 返回菜单树结构
 */
export function getMenuTree(data = {}) {
  return service({
    url: "/menu/tree",
    method: "POST",
    data
  })
}

/**
 * 创建/更新菜单
 * @param {Object} data 菜单数据
 * @param {String} data.name 菜单名称
 * @param {String} data.path 路由路径
 * @param {String} data.component 组件路径
 * @param {String} data.icon 图标
 * @param {Number} data.parentId 父级菜单ID
 * @param {Number} data.sort 排序
 * @param {Number} data.status 状态：1正常 0禁用
 * @param {Number} data.id 菜单ID（更新时传）
 * @returns {Promise} 返回保存结果
 */
export function saveMenu(data) {
  return service({
    url: "/menu/save",
    method: "POST",
    data
  })
}

/**
 * 获取菜单详情
 * @param {Object} data 请求参数
 * @param {Number} data.id 菜单ID
 * @returns {Promise} 返回菜单详情
 */
export function getMenuDetail(id) {
  return service({
    url: "/menu/detail",
    method: "POST",
    data: {
      id
    }
  })
}

/**
 * 软删除菜单
 * @param {Object} data 请求参数
 * @param {Number} data.id 菜单ID
 * @returns {Promise} 返回删除结果
 */
export function deleteMenu(data) {
  return service({
    url: "/menu/delete",
    method: "POST",
    data
  })
}