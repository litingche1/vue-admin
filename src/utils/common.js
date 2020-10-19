import { reactive } from '@vue/composition-api'
import {getCategory,getCategoryAll} from '@/api/news'
import request from '@/utils/request'
export function getInforCategory() {
    const categoryItem = reactive({
        item:[]
    })
    const getCategoryData = () => {
        getCategory({}).then(res=>{
            categoryItem.item=res.data.data.data
        }).catch(err=>{
            console.log(err)
        })
    }
    const getCategoryDataAll = () => {
        getCategoryAll({}).then(res=>{
            categoryItem.item=res.data.data
        }).catch(err=>{
            console.log(err)
        })
    }
    return {
        categoryItem,
        getCategoryData,
        getCategoryDataAll
    }
}
//时间戳转换成日期
export function timestampToTime(timestamp) {
    let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds();
    return Y+M+D+h+m+s;
}
//七牛云请求图片接口
export function  Qiniutoken(data){
    return request({
        method: 'post',
        url: "/uploadImgToken/",
        data,
    })
}
export function RequestTable(data) {
    return request({
        method: data.method||'post',
        url: data.url,
        data:data.params,
    })
}
//获取省、市、区
export function getCityPicker(data){
    return request({
        method: 'post',
        url: '/cityPicker/',
        data:data,
    })
}
