import service from "@/utils/request"

/**
 * 分页查询角色数据
 * @param {Object} query 查询参数
 * @param {Object} data 请求体（查询条件）
 * @param {Number} query.pageNum 页码
 * @param {Number} query.limit 每页条数
 * @returns {Promise} 返回分页数据 { data, total }
 */
export function getRolePage(query = {}, data = {}) {
  return service({
    url: "/role/page",
    method: "POST",
    data: {
      ...data,
      pageNum: query.pageNum || 1,
      limit: query.limit || 10
    }
  })
}

/**
 * 查询所有角色数据（不分页）
 * @param {Object} data 查询条件
 * @returns {Promise} 返回所有角色数据
 */
export function getAllRoles(data = {}) {
  return service({
    url: "/role/list",
    method: "POST",
    data
  })
}

/**
 * 创建/更新角色
 * @param {Object} data 角色数据
 * @param {String} data.name 角色名称
 * @param {String} data.code 角色标识
 * @param {String} data.description 角色描述
 * @param {Number} data.status 状态：1正常 0禁用
 * @param {Array} data.menuIds 菜单ID数组
 * @param {Number} data.id 角色ID（更新时传）
 * @returns {Promise} 返回保存结果
 */
export function saveRole(data) {
  return service({
    url: "/role/save",
    method: "POST",
    data
  })
}

/**
 * 获取角色详情
 * @param {Object} data 请求参数
 * @param {Number} data.id 角色ID
 * @returns {Promise} 返回角色详情包含菜单权限
 */
export function getRoleDetail(id) {
  return service({
    url: "/role/detail",
    method: "POST",
    data: {
      id
    }
  })
}

/**
 * 软删除角色
 * @param {Object} data 请求参数
 * @param {Number} data.id 角色ID
 * @returns {Promise} 返回删除结果
 */
export function deleteRole(id) {
  return service({
    url: "/role/delete",
    method: "POST",
    data: { id }
  })
}