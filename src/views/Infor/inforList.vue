<template>
    <div id="inforList-warp">
        <!-- 头部 -->
        <el-row :gutter="14" class="inforList-warp-header">
            <el-col :span="4">
                <div class="label-warp category">
                    <label for>分类&nbsp;&nbsp;:</label>
                    <div class="warp-content">
                        <el-select
                                v-model="categoryvalue"
                                placeholder="请选择"
                                style="width:100%"
                        >
                            <el-option
                                    v-for="item in options.item"
                                    :key="item.id"
                                    :label="item.category_name"
                                    :value="item.id"
                            ></el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="label-warp date">
                    <label for class="description">日期&nbsp;&nbsp;:</label>
                    <div class="warp-content">
                        <el-date-picker
                                v-model="datevalue"
                                style="width:100%"
                                type="datetimerange"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                        ></el-date-picker>
                    </div>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="label-warp keyword">
                    <label for class="description">关键字&nbsp;&nbsp;:</label>
                    <div class="warp-content">
                        <el-select
                                v-model="keywordvalue"
                                placeholder="请选择"
                                style="width:100%"
                        >
                            <el-option
                                    v-for="item in keywordoptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span="3">
                <el-input
                        v-model="input"
                        placeholder="请输入内容"
                        style="width:100%"
                ></el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="danger" @click="search()" style="width:100%">搜索</el-button>
            </el-col>
            <el-col :span="2">
                <div class="div-box"></div>
            </el-col>
            <el-col :span="2">
                <el-button
                        type="danger"
                        style="width:100%"
                        class="pull-right"
                        @click="showtck"
                >新增
                </el-button
                >
            </el-col>
        </el-row>
        <!-- 内容 -->
        <el-table :data="tableData.item" border v-loading="loadingData" @selection-change="handleSelectionChange"
                  style="width: 100%">
            <el-table-column type="selection" width="45"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="categoryId" label="类型" :formatter="categoryConversion" width="130"></el-table-column>
            <el-table-column prop="createDate" label="日期" :formatter="timeConversion" width="237"></el-table-column>
            <el-table-column prop="user" label="管理员" width="115"></el-table-column>
            <el-table-column label="操作" width="237">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="deleteItem(scope.row.id)"
                    >删除
                    </el-button
                    >
                    <el-button size="mini" type="success" @click="editItem(scope.row)"
                    >编辑
                    </el-button>
                    <el-button size="mini" type="success" @click="editItemDetails(scope.row)"
                    >编辑详情
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="black-space-30"></div>
        <el-row>
            <el-col :span="12">
                <el-button size="medium" @click="deleteAll()">批量删除</el-button>
            </el-col>
            <el-col :span="12">
                <el-pagination
                        background
                        class="pull-right"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[10, 20, 50, 100]"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalData"
                ></el-pagination>
            </el-col>
        </el-row>
        <Dialogs :showlog.sync="dialogShow" :catergory="options.item" @updatelist="updateTableList"/>
        <EditDialogs :showlog.sync="editdialogShow" :catergory="options.item" :dataItem="editData"
                     @updatelist="updateTableList"/>
    </div>
</template>

<script>
    import Dialogs from './dialog/index'
    import EditDialogs from './dialog/edit'
    import {ref, reactive, watchEffect, onMounted,computed} from '@vue/composition-api'
    import {getInfor, DeleteInfo} from '@/api/news'
    import {global} from '@/utils/globla.js'
    import {getInforCategory, timestampToTime} from "@/utils/common";

    export default {
        name: 'inforList',
        components: {
            Dialogs,
            EditDialogs,
        },
        setup(props, {root}) {
            console.log(props)
            const {str: zfc, confirm: confirmed} = global()
            const {categoryItem, getCategoryData} = getInforCategory()
            watchEffect(() => {
                console.log(zfc.value)
            })
            const categoryvalue = ref('') //类别选中的值
            const keywordvalue = ref('') //关键字选中的值
            const datevalue = ref('') //日期框选中的值
            const input = ref('')
            const dialogShow = ref(false) //新增弹框的状态
            const editdialogShow = ref(false) //表格内编辑弹框的状态
            let totalData = ref(0)
            let editData = reactive({
                item: {}
            })
            let loadingData = ref(false)
            let itemId = ref('')
            const options = reactive({
                    item: [{
                        value: '选项1',
                        label: '国际信息'
                    },
                        {
                            value: '选项2',
                            label: '国内信息'
                        },
                        {
                            value: '选项3',
                            label: '行业信息'
                        }]
                }
            )
            const keywordoptions = reactive([
                {
                    value: 'id',
                    label: 'ID'
                },
                {
                    value: 'title',
                    label: '标题'
                }
            ])
            let tableData = reactive({
                    item: []
                }
            )
            const pageData = reactive({
                pageNumber: 1,
                pageSize: 10
            })
            const handleSizeChange = val => {
                pageData.pageSize = val
                GetInfor()
            }
            const handleCurrentChange = val => {
                pageData.pageNumber = val
                GetInfor()
                console.log(`每页 ${val} 条`)
            }
            //新增
            const showtck = () => {
                dialogShow.value = true
            }
            //表格删除按钮
            const deleteItem = (id) => {
                itemId.value = [id]
                confirmed({
                    content: '此操作将永久删除该文件, 是否继续?',
                    id: 42222,
                    tip: '警告',
                    fn: confirms,
                })
            }
            //表格编辑
            const editItem = (row) => {
                editdialogShow.value = true
                editData.item = row
                console.log(editData)
            }
            const editItemDetails = data => {
                root.$router.push({
                    path: `/details`,
                    params: {id: data.id, title: data.title}
                })
                console.log(data.id, data.title)
                root.$store.commit('inforList/SET_ITEMDATA', {
                    id: {
                        value: data.id,
                        session: true,
                        name: 'inForItemId',
                    },
                    title: {
                        value: data.title,
                        session: true,
                        name: 'inForItemTitle',
                    }
                })
                const collapse = computed(() => root.$store.state.inforList.id)
                console.log(collapse)
            }
            // com
            //批量删除
            const deleteAll = () => {
                if (itemId.value.length < 1) {
                    root.$message({
                        message: '请选择想要删除的文件',
                        type: 'error'
                    })
                    return false
                }
                confirmed({
                    content: '此操作将永久删除所选择的文件, 是否继续?',
                    id: 42222,
                    tip: '警告',
                    fn: confirms,
                })
            }
            //表格删除的多选
            const handleSelectionChange = val => {
                itemId.value = val.map(item => item.id)
            }
            const confirms = () => {
                DeleteInfo({id: itemId.value}).then(res => {
                    console.log(res)
                    GetInfor()
                    itemId.value = ''
                }).catch(err => {
                    console.log(err)
                    itemId.value = ''
                })
            }
            const GetInfor = (data) => {
                loadingData.value = true
                let params = {}
                if (data) {
                    params = data
                } else {
                    params = getInforParams()
                    params.pageNumber = pageData.pageNumber
                    params.pageSize = pageData.pageSize
                }
                getInfor(params).then(res => {
                    tableData.item = res.data.data.data
                    loadingData.value = false
                    totalData.value = res.data.data.total
                    loadingData.value = false
                }).catch(err => {
                    console.log(err)
                })
            }
            const getInforParams = () => {
                let requestData = {}
                if (categoryvalue.value) {
                    requestData.categoryId = categoryvalue.value
                }
                if (datevalue.value.length > 1) {
                    requestData.startTiem = datevalue.value[0]
                    requestData.endTime = datevalue.value[1]
                }
                if (input.value) {
                    requestData[keywordvalue.value] = input.value
                }
                requestData.pageNumber = 1
                requestData.pageSize = 10
                return requestData
            }
            const search = () => {
                let data = getInforParams()
                GetInfor(data)
            }
            const timeConversion = row => {
                return timestampToTime(row.createDate)
            }
            const categoryConversion = row => {
                let data = options.item.filter(item => item.id === row.categoryId)
                return data[0].category_name
                // console.log(row,data)
            }
            //修改表格数据会刷新数据
            const updateTableList = () => {
                // window.location.reload();
                GetInfor()
            }
            /*
            * 生命周期函数
            * */
            onMounted(() => {
                getCategoryData()
                GetInfor()
            })
            //获取分类列表
            watchEffect(() => {
                options.item = categoryItem.item
                // catergoryData=categoryItem.item
                // console.log(catergoryData)
            })
            return {
                categoryvalue,
                keywordvalue,
                datevalue,
                input,
                dialogShow,
                editdialogShow,
                options,
                keywordoptions,
                tableData,
                totalData,
                loadingData,
                editData,
                // catergoryData,
                handleSizeChange,
                handleCurrentChange,
                showtck,
                deleteItem,
                handleSelectionChange,
                editItem,
                search,
                timeConversion,
                categoryConversion,
                deleteAll,
                editItemDetails,
                updateTableList
            }
        }
    }
</script>
<style lang="scss" scoped>
    #inforList-warp {
        .description {
            padding-right: 5px;
            box-sizing: border-box;
        }

        .div-box {
            padding: 8px;
            box-sizing: border-box;
        }

        .inforList-warp-header {
            margin-bottom: 18px;
        }

        .category {
            @include labelDom(left, 60, 40);
        }

        .date {
            @include labelDom(right, 93, 40);
        }

        .keyword {
            @include labelDom(right, 99, 40);
        }
    }
</style>
