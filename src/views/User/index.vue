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
                <el-button type="danger" class="pull-right">
                    添加用户
                </el-button>
            </el-col>
        </el-row>
        <div class="tablecon">
            <TableCommon :config="data.tableConfig">
                <template v-slot:status="slotData">
                    {{slotData.data.name}}
                    <el-switch
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                </template>
                <template v-slot:operating="slotData">
                    <el-button size="mini" type="danger">{{slotData.data.name}}</el-button>
                    <el-button size="mini" type="success">{{slotData.data.name}}</el-button>
                </template>
            </TableCommon>
        </div>
    </div>
</template>

<script>
    import {reactive} from '@vue/composition-api'
    import TableCommon from "@/components/TableCommon";

    export default {
        name: 'user',
        components: {
            TableCommon,
        },
        setup(props, {root}) {
            console.log(props, root)
            const data = reactive({
                selectValue: 'name',
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
                            prop: 'email',
                            label: '邮箱/用户名',
                        },
                        {
                            width: 100,
                            prop: 'name',
                            label: '真实姓名',
                        },
                        {
                            prop: 'phone',
                            label: '手机号',
                        },
                        {
                            prop: 'address',
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
                        url: '/news/getList/',
                        method: 'post',
                        params: {
                            pageNumber: 1,
                            pageSize: 10
                        }
                    }
                }
            })
            return {
                data
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
