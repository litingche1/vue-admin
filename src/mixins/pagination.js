let pagination = {
    data() {
        return {}

    },
    create() {

    },
    methods: {
        handleSizeChange(val) {
            this.pagination.pageSize = val
            this.pagination.currentPage = 1
            this.getData()
        },
        handleCurrentChange(val) {
            this.pagination.currentPage = val
            this.getData()
        },
        getData() {
            let resData = this.tableConfig.requestData
            if (resData.params) {
                let paramsData = {
                    url: resData.url,
                    method: resData.method,
                    params: {
                        pageNumber: this.pagination.currentPage,
                        pageSize: this.pagination.pageSize
                    }
                }
                this.requestTableData(paramsData)
            }
        }
    },
    mounted() {
        let resData = this.tableConfig.requestData
        if (resData.params) {
            this.pagination.pageSize = this.tableConfig.requestData.params.pageSize
        }


    }
}
export default pagination