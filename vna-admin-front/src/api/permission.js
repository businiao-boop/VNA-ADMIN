import service from '@/utils/request';

/**
 * 查询所有权限数据（不分页）
 * @param {Object} data 查询条件
 * @returns {Promise} 返回权限列表
 */
export function getAllPermissions(data = {}) {
  return service({
    url: '/permission/list',
    method: 'POST',
    data
  });
}

/**
 * 分页查询权限数据
 * @param {Object} query 查询参数
 * @param {Object} data 请求体（查询条件）
 * @param {Number} query.pageNum 页码
 * @param {Number} query.limit 每页条数
 * @returns {Promise} 返回分页数据 { data, total }
 */
export function getPermissionPage(query = {}, data = {}) {
  return service({
    url: '/permission/page',
    method: 'POST',
    data: {
      ...data,
      pageNum: query.pageNum || 1,
      limit: query.limit || 10
    }
  });
}

/**
 * 创建/更新权限
 * @param {Object} data 权限数据
 * @returns {Promise} 返回保存结果
 */
export function savePermission(data) {
  return service({
    url: '/permission/save',
    method: 'POST',
    data
  });
}

/**
 * 分配权限给角色
 * @param {Object} data 权限数据
 * @param {Number} data.roleId 角色ID
 * @param {Array} data.permissions 权限数组，每项包含menuId和actions数组
 * @returns {Promise} 返回分配结果
 */
export function assignRolePermissions(data) {
  return service({
    url: '/permission/assign',
    method: 'POST',
    data
  });
}

/**
 * 获取角色的权限列表
 * @param {Object} data 请求参数
 * @param {Number} data.roleId 角色ID
 * @returns {Promise} 返回角色权限列表，格式为 [{menuId: 1, actions: ['view', 'add']}, ...]
 */
export function getRolePermissions(data) {
  return service({
    url: '/permission/role-permissions',
    method: 'POST',
    data
  });
}

/**
 * 检查用户权限
 * @param {Object} data 请求参数
 * @param {Number} data.userId 用户ID
 * @param {String} data.permission 权限标识
 * @param {Number} data.menuId 菜单ID
 * @returns {Promise} 返回检查结果
 */
export function checkUserPermission(data) {
  return service({
    url: '/permission/check',
    method: 'POST',
    data
  });
}

/**
 * 软删除权限
 * @param {Object} data 请求参数
 * @param {Number} data.id 权限ID
 * @returns {Promise} 返回删除结果
 */
export function deletePermission(data) {
  return service({
    url: '/permission/delete',
    method: 'POST',
    data
  });
}