<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    v-if="tableConfig.selection"
                    type="selection"
                    width="55">
            </el-table-column>
            <template v-for="item in tableConfig.tableHead">
                <el-table-column v-if="item.isSlot==='slot'" :key="item.prop" :prop="item.prop" :label="item.label"
                                 :width="item.width">
                    <template slot-scope="scope">
                        <slot :name="item.slotName" :data="scope.row"></slot>
                    </template>
                </el-table-column>
                <el-table-column
                        v-else
                        :key="item.prop"
                        :prop="item.prop"
                        :label="item.label"
                        :width="item.width">
                </el-table-column>
            </template>
        </el-table>
        <el-pagination
                v-if="tableConfig.paginationShow"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pagination.currentPage"
                background
                :page-sizes="tableConfig.paginationPageSizes"
                :page-size="pagination.pageSize"
                :layout="tableConfig.paginationLayout"
                :total="pagination.total">
        </el-pagination>
    </div>

</template>

<script>
    import loadTable from '@/mixins/LoadTable.js'
    import pagination from '@/mixins/pagination'
    export default {
        name: "TableCommon",
        mixins:[loadTable,pagination],//多个的话，[a,b,c,d]
        props: {
            config: {
                type: Object,
                default: () => {
                }
            }
        },
        data(){
            return{
                tableData:[],
                tableConfig: {
                    selection: false,
                    tableHead: [],
                    requestData: {},
                    paginationShow: true,
                    paginationPageSizes: [],
                    paginationLayout:'total, sizes, prev, pager, next, jumper'
                },
                pagination: {
                    pageSize: 0,
                    currentPage: 1,
                    total: 0,
                }
            }
        },
        methods:{
           initialization(){
                let configData = this.config
                let keys = Object.keys(this.tableConfig)
                for (let key in configData) {
                    if (keys.includes(key)) {
                        this.tableConfig[key] = configData[key]
                    }
                }
            }
        },
        beforeMount() {
            this.initialization()
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>
