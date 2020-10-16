import {reactive} from '@vue/composition-api'
import {RequestTable} from '@/utils/common'

export function LodaTableData() {
    const tableResData = reactive({
        item: []
    })
    const requestTableData = params => {
        RequestTable(params).then(res => {
            tableResData.item=res.data.data.data
        }).catch(err => {
            console.log(err)
        })
    }
    return {
        tableResData, requestTableData
    }
}