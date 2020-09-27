import { reactive } from '@vue/composition-api'
import {getCategory} from '@/api/news'
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
    return {
        categoryItem,
        getCategoryData
    }
}
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
