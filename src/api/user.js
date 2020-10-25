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
 * 获取系统
 */
export function getSystem(data={}) {
    return request({
        method: 'post',
        url: "/system/",
        data,
    })
}
/**
 * 获取按钮权限
 */
export function permButton(data={}) {
    return request({
        method: 'post',
        url: "/permButton/",
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
/**
 * 用户编辑
 */
export function editUser(data) {
    return request({
        method: 'post',
        url: "/user/edit/",
        data,
    })
}
