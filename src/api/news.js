import request from '@/utils/request'
/**
 * 列表
 */





/**
 * 新增
 */





/**
 * 编辑
 */




/**
 * 删除
 */




/**
 * 信息分类添加一级
 */
export function AddFristCategory(data) {
    return request({
        method: 'post',
        url: "/news/addFirstCategory/",
        data,
    })
}


/**
 * 获取信息分类
 */
export function getCategory(data) {
    return request({
        method: 'post',
        url: "/news/getCategory/",
        data,
    })
}