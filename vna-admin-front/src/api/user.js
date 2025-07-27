import request from '@/utils/request';

/**
 * 获取用户分页列表
 * @param {Object} query 查询参数
 * @param {Object} data 请求体（查询条件）
 * @param {Number} query.pageNum 页码
 * @param {Number} query.limit 每页条数
 * @returns {Promise} 返回分页数据 { data, total }
 */
export const getUserPage = (query = {}, data = {}) => {
  return request({
    url: '/user/page',
    method: 'post',
    params: {
      pageNum: query.pageNum || 1,
      limit: query.limit || 10
    },
    data: {
      ...data
    }
  });
};

/**
 * 查询所有用户数据（不分页）
 * @param {Object} data 查询条件
 * @returns {Promise} 返回用户列表
 */
export const getAllUsers = (data = {}) => {
  return request({
    url: '/user/list',
    method: 'post',
    data
  });
};

/**
 * 创建/更新用户
 * @param {Object} data 用户数据
 * @returns {Promise} 返回保存结果
 */
export const saveUser = (data) => {
  return request({
    url: '/user/save',
    method: 'post',
    data
  });
};

/**
 * 获取用户详情
 * @param {Object} data 请求参数
 * @param {Number} data.id 用户ID
 * @returns {Promise} 返回用户详情
 */
export const getUserDetail = (data) => {
  return request({
    url: '/user/detail',
    method: 'post',
    data
  });
};

/**
 * 软删除用户
 * @param {Object} data 请求参数
 * @param {Number} data.id 用户ID
 * @returns {Promise} 返回删除结果
 */
export const deleteUser = (data) => {
  return request({
    url: '/user/delete',
    method: 'post',
    data
  });
};