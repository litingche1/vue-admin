<template>
    <el-dialog
            title="修改"
            :visible.sync="showdialog"
            @close="closedshow"
            width="700px"
            @open="opentck"
    >
        <el-form :model="data.form" ref="ruleForm">
            <el-form-item label="用户名:" :label-width="formLabelWidth" prop="username">
                <el-input v-model="data.form.username" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="姓名:" :label-width="formLabelWidth" prop="truename">
                <el-input v-model="data.form.truename" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="密码:" :label-width="formLabelWidth" prop="password">
                <el-input type="password" v-model="data.form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="手机号:" :label-width="formLabelWidth" prop="phone">
                <el-input v-model="data.form.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="地区:" :label-width="formLabelWidth" prop="region">
                <CityPickers :configCityData.sync="data.confingCityData"/>
                <!--            <CityPickers :cityConfig="['province','city','area']" :configCityData.sync="confingCityData"/>-->
            </el-form-item>
            <el-form-item label="是否启用:" :label-width="formLabelWidth" prop="status">
                <el-radio v-model="data.form.status" label="1">启用</el-radio>
                <el-radio v-model="data.form.status" label="2">禁止</el-radio>
            </el-form-item>
            <el-form-item label="角色:" :label-width="formLabelWidth" prop="role">
                <el-checkbox-group v-model="data.form.role" prop="checkList">
                    <el-checkbox v-for="item in data.checkData" :label="item.name" :key="item.role">{{item.name}}
                    </el-checkbox>
                </el-checkbox-group>
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
    import {ref, reactive, watchEffect, onBeforeMount} from '@vue/composition-api'
    import CityPickers from '@c/CityPicker/index'
    import {getRole, addUser} from '@/api/user'
    import sha1 from 'js-sha1' //sha1加密
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
        setup(props, {root, emit, refs}) {
            const data = reactive({
                checkData: [],
                confingCityData: {},
                form: {
                    username: '',
                    password: '',
                    truename: '',
                    phone: '',
                    region: '',
                    status: '1',
                    role: []
                }
            })
            //弹出框打开的时候执行该函数
            const opentck = () => {
                getRole().then(res => {
                    data.checkData = res.data.data
                })
            }
            onBeforeMount(() => {
                // getRole().then(res=>{
                //     console.log(res.data.data)
                // })
            })


            const showdialog = ref(false)
            const ruleForm = ref(null)
            const button_status = ref(false)
            const formLabelWidth = ref('90px')
            watchEffect(() => {
                showdialog.value = props.showlog
            })
            const closedshow = () => {
                showdialog.value = false
                emit('update:showlog', false)
            }
            //重置表单
            const resetFields = () => {
                data.confingCityData = {}
                refs.ruleForm.resetFields()
            }
            const submit = () => {
                console.log(data.form)
                if (!data.form.username) {
                    root.$message({
                        message: '用户名不能为空',
                        type: 'error'
                    })
                    return false
                }
                if (!data.form.password) {
                    root.$message({
                        message: '密码不能为空',
                        type: 'error'
                    })
                    return false
                }
                if (!data.form.status) {
                    root.$message({
                        message: '请选择是否禁用',
                        type: 'error'
                    })
                    return false
                }
                if (data.form.role.length < 1) {
                    root.$message({
                        message: '请选择角色',
                        type: 'error'
                    })
                    return false
                }
                let resData = JSON.parse(JSON.stringify(data.form))
                resData.role = resData.role.join()
                resData.region = JSON.stringify(data.confingCityData)
                resData.password=sha1(resData.password)
                addUser(resData).then(res => {
                    if (res.data.resCode === 0) {
                        root.$message({
                            message: res.data.message,
                            type: 'success'
                        })
                    }
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
                // button_status.value = true
                resetFields()
                closedshow()

            }
            return {
                closedshow,
                showdialog,
                button_status,
                ruleForm,
                formLabelWidth,
                opentck,
                submit,
                data
            }
        }
    }
</script>

<style>
</style>
