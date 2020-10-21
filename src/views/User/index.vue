<template>
    <div id="user-warp">
        <el-row :gutter="16">
            <el-col :span="20">
                <div class="label-wrap">
                    <label for="">关键字：</label>
                    <div class="warp-content">
                        <el-row :gutter="16">
                            <el-col :span="3">
                                <el-select v-model="data.selectValue">
                                    <el-option v-for="item in data.option" :key="item.value"
                                               :label="item.lable"
                                               :value="item.value"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="4">
                                <el-input placeholder="请输入搜索关键字">

                                </el-input>
                            </el-col>
                            <el-col :span="16">
                                <el-button type="danger">
                                    搜索
                                </el-button>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
            <el-col :span="4">
                <el-button type="danger" class="pull-right" @click="userAdds">
                    添加用户
                </el-button>
            </el-col>
        </el-row>
        <div class="tablecon">
            <TableCommon ref="tableComs" :config="data.tableConfig" :multipleChoice.sync="data.tableDelte">
                <template v-slot:status="slotData">
                    <el-switch
                            v-model="slotData.data.status"
                            active-value="1"
                            inactive-value="2"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @change="switchChange(slotData.data)"
                    >
                    </el-switch>
                </template>
                <template v-slot:operating="slotData">
                    <el-button size="mini" type="danger" @click="deleteRow(slotData.data)">删除</el-button>
                    <el-button size="mini" type="success" @click="editTable(slotData.data)">编辑</el-button>
                </template>
                <template v-slot:tableFooter>
                    <el-button size="small" @click="deleteAll">批量删除</el-button>
                </template>
            </TableCommon>
            <user-add :showlog.sync="data.dialogShow" @refresh="refreshTable" :editData="data.tableRow"></user-add>
        </div>
    </div>
</template>

<script>
    import {reactive, ref} from '@vue/composition-api'
    import TableCommon from "@/components/TableCommon";
    import userAdd from './dialog/add'
    import {deleteUser,activesUser} from '@/api/user'
    import {global} from '@/utils/globla.js'

    export default {
        name: 'user',
        components: {
            TableCommon,
            userAdd,
        },
        setup(props, {root}) {
            console.log(props, root)
            const {confirm} = global()
            const tableComs = ref(null)
            const switchStatus = ref(false)
            const data = reactive({
                selectValue: 'name',
                dialogShow: false,
                tableDelte: {},
                option: [
                    {
                        value: 'name', lable: '姓名'
                    },
                    {
                        value: 'phone', lable: '手机号'
                    },
                    {
                        value: 'email', lable: '邮箱'
                    }
                ],
                tableConfig: {
                    selection: true,
                    tableHead: [
                        {
                            width: 300,
                            prop: 'username',
                            label: '邮箱/用户名',
                        },
                        {
                            width: 100,
                            prop: 'truename',
                            label: '真实姓名',
                        },
                        {
                            prop: 'phone',
                            label: '手机号',
                        },
                        {
                            prop: 'region',
                            label: '地址',
                        },
                        {
                            width: 150,
                            prop: 'role',
                            label: '角色',
                        },
                        {
                            prop: 'status',
                            label: '禁启用状态',
                            isSlot: 'slot',
                            slotName: 'status'
                        },
                        {
                            label: '操作',
                            isSlot: 'slot',
                            slotName: 'operating'
                        },
                    ],
                    requestData: {
                        url: '/user/getList/',
                        method: 'post',
                        params: {
                            pageNumber: 1,
                            pageSize: 10
                        }
                    },
                    paginationShow: true,
                    paginationPageSizes: [5, 10, 20]
                },
                tableRow:{}
            })
            const userAdds = () => {
                data.dialogShow = true
            }
            //刷新表格数据
            const refreshTable = () => {
                //第一种
                tableComs.value.refreshTable()
                //第二种
                // refs.tableCom.refreshTable()
            }
            //批量删除
            const deleteAll = () => {
                let tableUserId = data.tableDelte.tableId
                if (!tableUserId || tableUserId.length === 0) {
                    root.$message({
                        message: '请选择需要删除的数据',
                        type: 'error'
                    })
                    return false
                }
                confirm({
                    content: '此操作将永久删除该文件, 是否继续?',
                    tip: '警告',
                    fn: deleteTableList,
                })
                console.log(tableUserId)

            }
            //删除单行
            const deleteRow = val => {
                console.log(val)
                data.tableDelte.tableId = [val.id]
                confirm({
                    content: '此操作将永久删除该文件, 是否继续?',
                    tip: '警告',
                    fn: deleteTableList,
                })
            }
            //删除表格数据的接口
            const deleteTableList = () => {
                let resData = {id: data.tableDelte.tableId}
                deleteUser(resData).then(res => {
                    if (res.data.resCode === 0) {
                        root.$message({
                            message: res.data.message,
                            type: 'success'
                        })
                        //刷新表格中的数据
                        refreshTable()
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
            //编辑
            const editTable = val => {
                // console.log(val)
                userAdds()
                data.tableRow=val
            }
            //用户禁启用
            const switchChange = val=>{
                console.log(val)
                if(switchStatus.value) return false
                switchStatus.value=true
                let params={
                    id:val.id,
                    status:val.status
                }
                activesUser(params).then(res=>{
                    if (res.data.resCode === 0) {
                        root.$message({
                            message: res.data.message,
                            type: 'success'
                        })
                        //刷新表格中的数据
                        refreshTable()
                        switchStatus.value=false
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
            return {
                data,
                userAdds,
                deleteAll,
                deleteRow,
                tableComs,
                refreshTable,
                editTable,
                switchChange
            }
        }
    }
</script>
<style lang="scss" scoped>
    #user-warp {
        .label-wrap {
            @include labelDom(left, 60, 40);
        }

        .tablecon {
            margin-top: 20px;
        }
    }
</style>
