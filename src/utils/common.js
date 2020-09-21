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
