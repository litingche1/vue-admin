<template>
    <el-table
            :data="data.tableData"
            border
            style="width: 100%">
        <el-table-column
                v-if="data.tableConfig.selection"
                type="selection"
                width="55">
        </el-table-column>
        <template v-for="item in data.tableConfig.tableHead">
            <el-table-column v-if="item.isSlot==='slot'" :key="item.prop" :prop="item.prop" :label="item.label"  :width="item.width">
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
</template>

<script>
    import {reactive, onBeforeMount,watchEffect} from '@vue/composition-api'
    import {LodaTableData} from './tableData'
    export default {
        name: "TableCommon",
        props: {
            config: {
                type: Object,
                default: () => {
                }
            }
        },
        setup(props, {root}) {
            const {tableResData,requestTableData} =LodaTableData({root})
            const data = reactive({
                tableData: [
                //     {
                //     email: '2016-05-02',
                //     name: '王小虎',
                //     phone: 137220124311,
                //     address: '上海市普陀区金沙江路 1518 弄',
                //     role: '超级管理员'
                // }, {
                //     email: '2016-05-04',
                //     name: '王小虎',
                //     phone: 187220124311,
                //     address: '上海市普陀区金沙江路 1517 弄',
                //     role: '普通管理员'
                // }, {
                //     email: '2016-05-01',
                //     name: '王小虎',
                //     phone: 137220124311,
                //     address: '上海市普陀区金沙江路 1519 弄',
                //     role: '普通管理员2'
                // }, {
                //     email: '2016-05-03',
                //     name: '王小虎',
                //     phone: 137220124311,
                //     address: '上海市普陀区金沙江路 1516 弄',
                //     role: '普通管理员3'
                // }
                ],
                tableConfig: {
                    selection: false,
                    tableHead: [],
                    requestData:{},
                }
            })
            const initialization = () => {
                let configData = props.config
                let keys=Object.keys(data.tableConfig)
                for (let key in configData) {
                    if(keys.includes(key)){
                        data.tableConfig[key] = configData[key]
                    }
                }
            }
            //监听接口返回来的值
            watchEffect(()=>{
                data.tableData=tableResData.item
            })
            onBeforeMount(() => {
                initialization()
                requestTableData(data.tableConfig.requestData)
            })
            return {
                data
            }
        }
    }
</script>

<style scoped>

</style>
