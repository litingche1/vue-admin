import {reactive} from '@vue/composition-api'

export function tablePagination() {
    const paginationData = reactive({
        pageSize: 0,
        currentPage: 1,
    })
    const handleSizeChange = val => {
        paginationData.pageSize = val
        paginationData.currentPage = 1
    }
    const handleCurrentChange = val => paginationData.currentPage = val
    const setPageSize = val => paginationData.pageSize = val
    return {
        paginationData,
        handleSizeChange,
        handleCurrentChange,
        setPageSize
    }
}