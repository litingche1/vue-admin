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