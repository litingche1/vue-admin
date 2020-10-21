import request from '@/utils/request'
/**
 * 获取角色
 */
export function getRole(data={}) {
    return request({
        method: 'post',
        url: "/role/",
        data,
    })
}
/**
 * 获取用户列表
 */
export function addUser(data) {
    return request({
        method: 'post',
        url: "/user/add/",
        data,
    })
}
/**
 * 删除用户
 */
export function deleteUser(data) {
    return request({
        method: 'post',
        url: "/user/delete/",
        data,
    })
}
/**
 * 用户禁启用
 */
export function activesUser(data) {
    return request({
        method: 'post',
        url: "/user/actives/",
        data,
    })
}
