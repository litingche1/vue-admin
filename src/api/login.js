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




/**
 * 登录
 */




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