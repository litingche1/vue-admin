import request from '@/utils/request'
/**
 * 列表
 */
export function getInfor(data) {
    return request({
        method: 'post',
        url: "/news/getList/",
        data,
    })
}




/**
 * 新增
 */
export function EditInfo(data) {
    return request({
        method: 'post',
        url: "/news/editInfo/",
        data,
    })
}




/**
 * 编辑
 */
export function AddInfor(data) {
    return request({
        method: 'post',
        url: "/news/add/",
        data,
    })
}



/**
 * 删除
 */
export function DeleteInfo(data) {
    return request({
        method: 'post',
        url: "/news/deleteInfo/",
        data,
    })
}



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
* 信息分类添加二级
*/
export function AddTwoCategory(data) {
    return request({
        method: 'post',
        url: "/news/addChildrenCategory/",
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
/**
 * 获取信息分类(有子级分类)
 */
export function getCategoryAll(data) {
    return request({
        method: 'post',
        url: "/news/getCategoryAll/",
        data,
    })
}
/**
 * 删除一级分类
 */
export function deleteCategory(data) {
    return request({
        method: 'post',
        url: "/news/deleteCategory/",
        data,
    })
}

/**
 * 修改一级分类
 */
export function editCategory(data) {
    return request({
        method: 'post',
        url: "/news/editCategory/",
        data,
    })
}