<template>
    <el-dialog
            title="修改"
            :visible.sync="showdialog"
            @close="closedshow"
            width="700px"
            @opened="opentck"
    >
        <el-form :model="data.form" ref="ruleForm" :rules="rules">
            <el-form-item label="用户名:" :label-width="formLabelWidth" prop="username">
                <el-input v-model="data.form.username" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="姓名:" :label-width="formLabelWidth" prop="truename">
                <el-input v-model="data.form.truename" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="密码:" :label-width="formLabelWidth" prop="password">
                <el-input type="password" v-model="data.form.password" placeholder="请输入6至20位数字+字母的密码"></el-input>
            </el-form-item>
            <el-form-item label="地区:" :label-width="formLabelWidth" prop="region">
                <CityPickers :configCityData.sync="data.confingCityData"/>
            </el-form-item>
            <!--            <CityPickers :cityConfig="['province','city','area']" :configCityData.sync="confingCityData"/>-->
            <el-form-item label="手机号:" :label-width="formLabelWidth" prop="phone">
                <el-input v-model="data.form.phone" placeholder="请输入手机号"></el-input>
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
            <el-form-item label="按钮:" :label-width="formLabelWidth">
                <template v-if="data.buttonList.length>0">
                    <div v-for="items in data.buttonList" :key="items.id">
                        <h4>{{items.name}}</h4>
                        <el-checkbox-group v-if="items.perm.length>0" v-model="data.form.btnPerm" prop="checkList">
                            <el-checkbox v-for="child in items.perm" :label="child.name" :key="child.value">
                                {{child.name}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>


                </template>

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
    import {
        stripscript,
        validateEmail,
        validatePassword,
    } from '@/utils/validate'
    import {ref, reactive, watchEffect, onBeforeMount} from '@vue/composition-api'
    import CityPickers from '@c/CityPicker/index'
    import {getRole, addUser, editUser, permButton} from '@/api/user'
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
            },
            editData: {
                type: Object,
                default: () => {
                }
            }
        },
        components: {
            CityPickers,
        },
        setup(props, {root, emit, refs}) {
            //验证用户名
            let validateUsername = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'))
                } else if (validateEmail(value)) {
                    callback(new Error('用户名格式有误'))
                } else {
                    callback()
                }
            }
            //验证密码
            let validatePass = (rule, value, callback) => {
                /**
                 * 业务逻辑
                 * 1、编辑状态：
                 *    需要检验：data.form.id存在并且，密码不为空时
                 *    不需要检验：data.form.id存在并且，密码为空时
                 *
                 * 2、添加状态
                 *    需要检验：data.form.id不存在
                 */
                if (data.form.id && !value) {
                    callback()
                }
                if ((data.form.id && value) || !data.form.id) {
                    data.form.password = stripscript(value)
                    value = data.form.password
                    if (value === '') {
                        callback(new Error('请输入密码'))
                    } else if (validatePassword(value)) {
                        callback(new Error('密码为6至20位数字+字母'))
                    } else {
                        callback()
                    }
                }

            }
            //表单校验规则
            const rules = reactive({
                password: [{validator: validatePass, trigger: 'blur'}],
                username: [{validator: validateUsername, trigger: 'blur'}],
                role: [
                    {required: true, message: '请选择活动区域', trigger: 'change'}
                ],
            })
            const data = reactive({
                checkData: [],
                buttonList: [],
                confingCityData: {},
                form: {
                    username: '',
                    password: '',
                    truename: '',
                    phone: '',
                    region: '',
                    status: '1',
                    role: [],
                    btnPerm: [],
                }
            })
            //弹出框打开的时候执行该函数
            const opentck = () => {
                if (data.checkData.length === 0) {
                    getRole().then(res => {
                        data.checkData = res.data.data
                    })
                }
                if (data.buttonList === 0) {
                    permButton().then(res => {
                        data.buttonList = res.data.data
                    })
                }
                let editData = props.editData
                //编辑状态
                if (editData.id) {
                    editData.role = editData.role ? editData.role.split(',') : []
                    editData.btnPerm = editData.btnPerm ? editData.btnPerm.split(',') : []
                    for (let key in editData) {
                        data.form[key] = editData[key]
                    }
                    console.log(data.form)
                } else {//新增状态
                    console.log(9999)
                    data.form.id && delete data.form.id
                    console.log(data.form)
                    // for (let key in editData) {
                    //     if (key === 'role') {
                    //         data.form.role = []
                    //     } else if (key === 'status') {
                    //         data.form.status = '1'
                    //     } else {
                    //         data.form[key] = editData[key]
                    //     }
                    //
                    // }
                }

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
                resetFields()
                emit('update:showlog', false)

            }
            //重置表单
            const resetFields = () => {
                data.confingCityData = {}
                refs.ruleForm.resetFields()
            }
            //编辑用户信息
            const editUserData = params => {
                editUser(params).then(res => {
                    if (res.data.resCode === 0) {
                        root.$message({
                            message: res.data.message,
                            type: 'success'
                        })
                        emit('refresh')
                    }
                })
            }
            //添加用户
            const addUserData = params => {
                addUser(params).then(res => {
                    if (res.data.resCode === 0) {
                        root.$message({
                            message: res.data.message,
                            type: 'success'
                        })
                        emit('refresh')
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
            //提交
            const submit = () => {
                refs.ruleForm.validate(valid => {
                    if (valid) {
                        let resData = JSON.parse(JSON.stringify(data.form))
                        resData.role = resData.role.join()
                        resData.btnPerm = resData.btnPerm.join()
                        resData.region = JSON.stringify(data.confingCityData)
                        if (resData.id) {
                            if (resData.password) {
                                resData.password = sha1(resData.password)
                            } else {
                                delete resData.password
                            }
                            editUserData(resData)
                        } else {
                            resData.password = sha1(resData.password)
                            addUserData(resData)
                        }
                        // button_status.value = true
                        resetFields()
                        closedshow()
                    } else {
                        root.$message.error('表单填写不完整')
                        return false
                    }
                })
            }
            return {
                closedshow,
                showdialog,
                button_status,
                ruleForm,
                formLabelWidth,
                opentck,
                submit,
                data,
                rules
            }
        }
    }
</script>

<style>
</style>
