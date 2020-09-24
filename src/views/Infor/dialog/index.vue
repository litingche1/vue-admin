<template>
    <el-dialog
            title="新增"
            :visible.sync="showdialog"
            @close="closedshow"
            width="580px"
            @open="opentck"
    >
        <el-form :model="forms" ref="ruleForm">
            <el-form-item label="类型:" :label-width="formLabelWidth">
                <el-select v-model="forms.region" placeholder="请选择分类">
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
            <el-button type="danger" @click="submit()" :loading="button_status"
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
            const ruleForm = ref(null)
            const button_status=ref(false)
            const formLabelWidth = ref('70px')
            let forms = reactive({
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
                    button_status.value=false
                  if(res.data.resCode===0){
                    root.$message({
                      message: res.data.message,
                      type: 'success'
                    })
                  }
                }).catch(err=>{
                    button_status.value=false
                  console.log(err)
                })
            }
            const resetFields =()=>{
                forms.name=''
                forms.region=''
                forms.resource=''
            }
            const submit = () => {
                if(!forms.region){
                    root.$message({
                        message: '类型不能为空',
                        type: 'error'
                    })
                    return false
                }
                if(!forms.name){
                    root.$message({
                        message: '标题不能为空',
                        type: 'error'
                    })
                    return false
                }
                if(!forms.resource){
                    root.$message({
                        message: '概况不能为空',
                        type: 'error'
                    })
                    return false
                }
                button_status.value=true
                addInfors()
                resetFields()
                closedshow()

            }
            return {
                closedshow,
                showdialog,
                forms,
                button_status,
                ruleForm,
                formLabelWidth,
                options,
                opentck,
                submit
            }
        }
    }
</script>

<style></style>
