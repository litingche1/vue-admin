<template>
    <el-dialog
            title="新增"
            :visible.sync="showdialog"
            @close="closedshow"
            width="580px"
            @open="opentck"
    >
        <el-form :model="forms">
            <el-form-item label="类型:" :label-width="formLabelWidth">
                <el-select v-model="forms.region" placeholder="请选择活动区域">
                    <el-option
                            v-for="item in options.item"
                            :key="item.id"
                            :label="item.category_name"
                            :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题:" :label-width="formLabelWidth">
                <el-input v-model="forms.name" placeholder="请选输入内容"></el-input>
            </el-form-item>
            <el-form-item label="概况:" :label-width="formLabelWidth">
                <el-input
                        type="textarea"
                        v-model="forms.resource"
                        placeholder="请选输入内容"
                ></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closedshow">取消</el-button>
            <el-button type="danger" @click="submit()"
            >确定
            </el-button
            >
        </div>
    </el-dialog>
</template>

<script>
    import {ref, reactive, watchEffect} from '@vue/composition-api'
    import {AddInfor} from '@/api/news'

    export default {
        name: 'dialogs',
        props: {
            showlog: {
                type: Boolean
            },
            catergory: {
                type: Array
            }
        },
        setup(props, {root,emit}) {
            const showdialog = ref(false)
            const formLabelWidth = ref('70px')
            const forms = reactive({
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            })
            const options = reactive({
                item: []
            })
            watchEffect(() => {
                showdialog.value = props.showlog
            })
            const closedshow = () => {
                showdialog.value = false
                emit('update:showlog', false)
            }
            const opentck = () => {
                console.log(props.catergory)
                options.item = props.catergory
            }
            const addInfors = () => {
                let params = {
                    categoryId: forms.region,
                    title: forms.name,
                    imgUrl: '',
                    createDate: '',
                    status: '',
                    content: forms.resource,
                }
                AddInfor(params).then(res => {
                  if(res.data.resCode===0){
                    root.$message({
                      message: res.data.message,
                      type: 'success'
                    })
                  }
                }).catch(err=>{
                  console.log(err)
                })
            }
            const submit = () => {
                addInfors()
                closedshow()

            }
            return {
                closedshow,
                showdialog,
                forms,
                formLabelWidth,
                options,
                opentck,
                submit
            }
        }
    }
</script>

<style></style>
