<template>
    <el-dialog
            title="修改"
            :visible.sync="showdialog"
            @close="closedshow"
            width="700px"
            @open="opentck"
    >
        <el-form :model="forms" ref="ruleForm">
            <el-form-item label="用户名:" :label-width="formLabelWidth">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="姓名:" :label-width="formLabelWidth">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="手机号:" :label-width="formLabelWidth">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="地区:" :label-width="formLabelWidth">
                <CityPickers :configCityData.sync="confingCityData"/>
<!--            <CityPickers :cityConfig="['province','city','area']" :configCityData.sync="confingCityData"/>-->
            </el-form-item>
            <el-form-item label="是否启用:" :label-width="formLabelWidth">
                <el-radio v-model="data.radio" label="1">启用</el-radio>
                <el-radio v-model="data.radio" label="2">禁止</el-radio>
            </el-form-item>
            <el-form-item label="角色:" :label-width="formLabelWidth">
                <el-checkbox-group v-model="data.checkList">
                    <el-checkbox v-for="item in data.checkData" :label="item.name" :key="item.role">{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <!--            <el-form-item label="类型:" :label-width="formLabelWidth">-->
            <!--                <el-select v-model="forms.region" placeholder="请选择分类">-->
            <!--                    <el-option-->
            <!--                            v-for="item in options.item"-->
            <!--                            :key="item.id"-->
            <!--                            :label="item.category_name"-->
            <!--                            :value="item.id"-->
            <!--                    ></el-option>-->
            <!--                </el-select>-->
            <!--            </el-form-item>-->
            <!--            <el-form-item label="标题:" :label-width="formLabelWidth">-->
            <!--                <el-input v-model="forms.name" placeholder="请选输入内容"></el-input>-->
            <!--            </el-form-item>-->
            <!--            <el-form-item label="概况:" :label-width="formLabelWidth">-->
            <!--                <el-input-->
            <!--                        type="textarea"-->
            <!--                        v-model="forms.resource"-->
            <!--                        placeholder="请选输入内容"-->
            <!--                ></el-input>-->
            <!--            </el-form-item>-->
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
    import {ref, reactive, watchEffect,onBeforeMount} from '@vue/composition-api'
    import {EditInfo} from '@/api/news'
    import CityPickers from '@c/CityPicker/index'
   import{getRole} from '@/api/user'
    export default {
        name: 'dialogs',
        props: {
            showlog: {
                type: Boolean
            },
            catergory: {
                type: Array
            },
            dataItem: {
                type: Object
            }
        },
        components: {
            CityPickers,
        },
        setup(props, {root, emit}) {
            const data = reactive({
                radio: '1',
                checkList:[],
                checkData:[]
            })

            const opentck =()=>{
                getRole().then(res=>{
                    data.checkData=res.data.data
                    console.log(res.data.data)
                })
            }
            onBeforeMount(()=>{
                // getRole().then(res=>{
                //     console.log(res.data.data)
                // })
            })











            const showdialog = ref(false)
            const ruleForm = ref(null)
            const button_status = ref(false)
            const formLabelWidth = ref('90px')
            const confingCityData=reactive({

            })
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
                // console.log(props)
            })
            const closedshow = () => {
                showdialog.value = false
                emit('update:showlog', false)
            }
            //弹出框打开的时候执行该函数
            // const opentck = () => {
            //     const data = props.dataItem.item
            //     options.item = props.catergory
            //     forms.name = data.title
            //     forms.resource = data.content
            //     const categoryName = options.item.filter(item => item.id === data.categoryId)
            //     forms.region = categoryName[0].category_name
            // }
            const editInfo = () => {
                let params = {
                    id: props.dataItem.item.id,
                    categoryId: props.dataItem.item.categoryId,
                    title: forms.name,
                    imgUrl: '',
                    updateDate: '',
                    content: forms.resource,
                }
                EditInfo(params).then(res => {
                    button_status.value = false
                    if (res.data.resCode === 0) {
                        root.$message({
                            message: res.data.message,
                            type: 'success'
                        })
                        emit('updatelist')
                    }
                }).catch(err => {
                    button_status.value = false
                    console.log(err)
                })
            }
            const submit = () => {
                if (!forms.region) {
                    root.$message({
                        message: '类型不能为空',
                        type: 'error'
                    })
                    return false
                }
                if (!forms.name) {
                    root.$message({
                        message: '标题不能为空',
                        type: 'error'
                    })
                    return false
                }
                if (!forms.resource) {
                    root.$message({
                        message: '概况不能为空',
                        type: 'error'
                    })
                    return false
                }
                button_status.value = true
                editInfo()
                // resetFields()
                closedshow()

            }
            return {
                closedshow,
                showdialog,
                forms,
                confingCityData,
                button_status,
                ruleForm,
                formLabelWidth,
                options,
                opentck,
                submit,
                data
            }
        }
    }
</script>

<style>
</style>
