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
        <el-table-column
                v-for="item in data.tableConfig.tableHead"
                :key="item.prop"
                :prop="item.prop"
                :label="item.label"
                :width="item.width">
        </el-table-column>

    </el-table>
</template>

<script>
    import {reactive, onBeforeMount} from '@vue/composition-api'

    export default {
        name: "TableCommon",
        props: {
            config: {
                type: Object,
                default: () => {}
            }
        },
        setup(props, {root}) {
            console.log(props, root)
            const data = reactive({
                tableData: [{
                    email: '2016-05-02',
                    name: '王小虎',
                    phone: 137220124311,
                    address: '上海市普陀区金沙江路 1518 弄',
                    role: '超级管理员'
                }, {
                    email: '2016-05-04',
                    name: '王小虎',
                    phone: 187220124311,
                    address: '上海市普陀区金沙江路 1517 弄',
                    role: '普通管理员'
                }, {
                    email: '2016-05-01',
                    name: '王小虎',
                    phone: 137220124311,
                    address: '上海市普陀区金沙江路 1519 弄',
                    role: '普通管理员2'
                }, {
                    email: '2016-05-03',
                    name: '王小虎',
                    phone: 137220124311,
                    address: '上海市普陀区金沙江路 1516 弄',
                    role: '普通管理员3'
                }],
                tableConfig: {
                    selection: false,
                    tableHead: []
                }
            })
            const initialization = () => {
                let configData = props.config
                for (let key in configData) {
                    if (data.tableConfig[key]) {
                        data.tableConfig[key] = configData[key]
                    }
                }
            }
            onBeforeMount(() => {
                initialization()
            })
            return {
                data
            }
        }
    }
</script>

<style scoped>

</style>