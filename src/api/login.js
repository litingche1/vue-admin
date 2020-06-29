import service from '@/utils/request'
/**
 * 获取验证码
 */
export function GetSms() {
    service.request({
        method: 'post',
        url: '/getSms/',
        data: {
            username: '1111111@qq.com',
            module: 'login'
        }
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