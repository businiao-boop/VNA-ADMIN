import request from '@/utils/request';

/**
 * 用户登录
 * @param {Object} data 登录数据
 * @param {String} data.username 用户名
 * @param {String} data.password 密码
 * @returns {Promise} 返回登录结果和token
 */
export const login = (data) => {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  });
};

/**
 * 获取用户信息
 * @param {Object} params 请求参数
 * @returns {Promise} 返回用户详细信息
 */
export const getUserProfile = (params = {}) => {
  return request({
    url: '/auth/profile',
    method: 'post',
    params
  });
};

/**
 * 用户注册
 * @param {Object} data 注册数据
 * @param {String} data.username 用户名
 * @param {String} data.password 密码
 * @returns {Promise} 返回注册结果
 */
export const register = (data) => {
  return request({
    url: '/auth/register',
    method: 'post',
    data
  });
};