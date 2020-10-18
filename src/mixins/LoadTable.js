import {RequestTable} from '@/utils/common'

let loadTable = {
    data() {
        return {}
    },
    create() {

    },
    methods: {
        requestTableData(params) {
            RequestTable(params).then(res => {
                this.tableData = res.data.data.data
                this.pagination.total = res.data.data.total
            }).catch(err => {
                console.log(err)
            })
        }
    },
    mounted() {
        this.requestTableData(this.tableConfig.requestData)
    }
}
export default loadTable