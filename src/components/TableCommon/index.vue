<template>
    <div>
        <el-table
                :data="data.tableData"
                border
                @selection-change="tableHandleSelectionChange"
                style="width: 100%">
            <el-table-column
                    v-if="data.tableConfig.selection"
                    type="selection"
                    width="55">
            </el-table-column>
            <template v-for="item in data.tableConfig.tableHead">
                <el-table-column v-if="item.isSlot==='slot'" :key="item.prop" :prop="item.prop" :label="item.label"
                                 :width="item.width">
                    <template slot-scope="scope">
<!--                        //父组件获取数据的方式是设置的slot的名字.data,因为这里设置了：data,例如slotName: 'status',v-slot:status="slotData"父组件中获取改行数据的方法是slotData.data-->
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
        <div class="table-footer">
            <slot name="tableFooter"></slot>
            <el-pagination
                    v-if="data.tableConfig.paginationShow"
                    class="pull-right"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="data.pagination.currentPage"
                    background
                    :page-sizes="data.tableConfig.paginationPageSizes"
                    :page-size="data.pagination.pageSize"
                    :layout="data.tableConfig.paginationLayout"
                    :total="data.pagination.total">
            </el-pagination>
        </div>

    </div>

</template>

<script>
    import {reactive, onBeforeMount, watchEffect, watch} from '@vue/composition-api'
    import {LodaTableData} from './tableData'
    import {tablePagination} from './pagination'

    export default {
        name: "TableCommon",
        props: {
            config: {
                type: Object,
                default: () => {
                }
            },
            multipleChoice: {
                type: Object,
                default: () => {
                }
            }
        },
        setup(props, {root, emit}) {
            //获取表格数据的方法
            const {tableResData, requestTableData} = LodaTableData({root})
            //分页
            const {paginationData, handleSizeChange, handleCurrentChange, setPageSize} = tablePagination()
            const data = reactive({
                tableData: [],
                tableConfig: {
                    selection: false,
                    tableHead: [],
                    requestData: {},
                    paginationShow: true,
                    paginationPageSizes: [],
                    paginationLayout: 'total, sizes, prev, pager, next, jumper'
                },
                pagination: {
                    pageSize: 0,
                    currentPage: 0,
                    total: 0,
                }
            })
            const initialization = () => {
                let configData = props.config
                let keys = Object.keys(data.tableConfig)
                for (let key in configData) {
                    if (keys.includes(key)) {
                        data.tableConfig[key] = configData[key]
                    }
                }
            }
            //批量删除勾选框
            const tableHandleSelectionChange = val => {
                let data = {
                    tableId: val.map(item => item.id)
                }
                emit('update:multipleChoice', data)
            }
            //刷新表格数据
            const refreshTable = ()=>{
                requestTableData(data.tableConfig.requestData)
            }
            //监听接口返回来的值
            watch([() => paginationData.currentPage, () => paginationData.pageSize], ([currentPage, pageSize]) => {
                data.pagination.pageSize = pageSize
                data.pagination.currentPage = currentPage
                let resData = data.tableConfig.requestData
                if (resData.params) {
                    let paramsData = {
                        url: resData.url,
                        method: resData.method,
                        params: {
                            pageNumber: currentPage,
                            pageSize: pageSize
                        }
                    }
                    requestTableData(paramsData)
                }

            })
            watchEffect(() => {
                data.tableData = tableResData.item
                data.pagination.total = tableResData.tableTotal
            })
            onBeforeMount(() => {
                initialization()
                data.pagination.pageSize = data.tableConfig.requestData.params.pageSize
                setPageSize(data.pagination.pageSize)
                requestTableData(data.tableConfig.requestData)
            })
            return {
                data, handleSizeChange, handleCurrentChange, tableHandleSelectionChange,refreshTable
            }
        }
    }
</script>

<style scoped>
    .table-footer {
        margin-top: 10px;
    }
</style>
