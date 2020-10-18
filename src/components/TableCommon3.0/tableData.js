import {reactive} from '@vue/composition-api'
import {RequestTable} from '@/utils/common'

export function LodaTableData() {
    const tableResData = reactive({
        item: [],
        tableTotal:0,
    })
    const requestTableData = params => {
        RequestTable(params).then(res => {
            tableResData.item=res.data.data.data
            tableResData.tableTotal=res.data.data.total
        }).catch(err => {
            console.log(err)
        })
    }
    return {
        tableResData, requestTableData
    }
}