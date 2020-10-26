import request from '@/utils/request'
/**
 * 获取验证码
 */
export function GetSms (data) {
    return request({
        method: 'post',
        url: '/getSms/',
        data,//data:data可以写成data,es6的语法
    })
}



/**
 * 获取用户角色
 */
export function GetuserRole (data={}) {
    return request({
        method: 'post',
        url: '/userRole/',
        data,//data:data可以写成data,es6的语法
    })
}


/**
 * 登录
 */
export function Login (data) {
    return request({
        method: 'post',
        url: '/login/',
        data,//data:data可以写成data,es6的语法
    })
}

/**
 * 退出
 */
export function Logout (data) {
    return request({
        method: 'post',
        url: '/logout/',
        data,//data:data可以写成data,es6的语法
    })
}


/**
 * 注册
 */
export function Register (data) {
    return request({
        method: 'post',
        url: '/register/',
        data,//data:data可以写成data,es6的语法
    })
}
