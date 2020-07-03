<template>
  <div id="login">
    <div class="login-warp">
      <ul class="menu-tab">
        <li
          v-for="(item, idx) in loginList"
          :key="idx"
          @click="menuchange(idx)"
          :class="{ current: idx === menuIdx }"
        >
          {{ item }}
        </li>
      </ul>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-ruleForm"
      >
        <el-form-item label="邮箱" prop="username" class="item-form">
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" class="item-form">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="menuIdx === 1"
          label="重复密码"
          prop="password"
          class="item-form"
        >
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="20">
            <el-col :span="15">
              <el-input
                type="text"
                v-model="ruleForm.code"
                autocomplete="off"
                minlength="6"
                maxlength="6"
              ></el-input>
            </el-col>
            <el-col :span="9">
              <el-button
                type="success"
                class="btn-submit"
                @click="getSms"
                :disabled="codeBtnStatus.status"
                >{{ codeBtnStatus.text }}</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            :disabled="loginBtn"
            class="margin-top-19 btn-submit"
            >{{ menuIdx === 0 ? '登录' : '注册' }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  stripscript,
  validateEmail,
  validatePassword,
  validateCodes
} from '@/utils/validate'
import { ref, reactive, onMounted } from '@vue/composition-api'
import { GetSms, Register, Login } from '@/api/login'
import sha1 from 'js-sha1' //sha1加密
export default {
  name: 'loin',
  setup(props, { refs, root }) {
    /**
     * context是setup函数的第二个参数，{ refs, root }是解构赋值的写法获取context里面对应的值
     * context里面包含以下内容(==后面的内容是vuw2.x的对应写法)
          root: (...)  == this
          parent: (...) == this.$parent
          refs: (...)  == this.$refs
          attrs: (...) == this.$attrs
          listeners: (...) == this.$listeners
          isServer: (...) == this.$isServer
          ssrContext: (...)
          emit: (...) == this.$emit
          slots: {}
     */
    //验证验证码
    let checkcode = (rule, value, callback) => {
      ruleForm.code = stripscript(value)
      value = ruleForm.code
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else if (validateCodes(value)) {
        callback(new Error('验证码格式有误'))
      } else {
        callback()
      }
    }
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
      ruleForm.pass = stripscript(value)
      value = ruleForm.pass
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (validatePassword(value)) {
        callback(new Error('密码为6至20位数字+字母'))
      } else {
        callback()
      }
    }
    //验证重复密码
    let validatePass2 = (rule, value, callback) => {
      ruleForm.passWord = stripscript(value)
      value = ruleForm.passWord
      if (value === '') {
        callback(new Error('请输入重复密码'))
      } else if (value !== ruleForm.pass) {
        callback(new Error('二次密码不一致'))
      } else {
        callback()
      }
    }
    //注册和登录模块的切换
    const menuchange = idx => {
      menuIdx.value = idx
      restFields()
      clearcountDown()
    }
    //整个表单的校验函数
    const submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          console.log(menuIdx.value)
          menuIdx.value === 0 ? Logins() : register()
        } else {
          root.$message.error('表单填写不完整')
          return false
        }
      })
    }
    //获取验证码
    const getSms = () => {
      //判断邮箱不能为空
      if (ruleForm.username === '') {
        root.$message.error('邮箱不能为空')
        return false
      }
      //判断邮箱格式
      if (validateEmail(ruleForm.username)) {
        root.$message.error('邮箱格式有误')
        return false
      }
      codeButtonStatus({
        status: true,
        text: '发送中'
      })
      let params = {
        username: ruleForm.username,
        module: menuIdx.value === 0 ? 'login' : 'register'
      }
      //请求获取验证码的接口
      GetSms(params)
        .then(res => {
          let data = res.data
          root.$message.success(data.message)
          //启用登录/注册按钮
          loginBtn.value = false
          countDown(60)
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    }
    //倒计时
    const countDown = num => {
      //判断定时器是否存在，存在就先消除上一次的定时器
      if (timer.value) {
        clearInterval(timer.value)
      }
      let times = num
      timer.value = setInterval(() => {
        times--
        if (times === 0) {
          clearInterval(timer.value)
          codeButtonStatus({
            status: false,
            text: '再次获取'
          })
        } else {
          codeBtnStatus.text = `倒计时${times}秒`
        }
      }, 1000)
    }
    //消除定时器
    const clearcountDown = () => {
      codeButtonStatus({
        status: false,
        text: '获取验证码'
      })
      clearInterval(timer.value)
    }
    //重置表单
    const restFields = () => {
      refs.ruleForm.resetFields()
    }
    //更改验证码按钮状态
    const codeButtonStatus = params => {
      codeBtnStatus.status = params.status
      codeBtnStatus.text = params.text
    }
    //请求注册的接口
    const register = () => {
      let params = {
        username: ruleForm.username,
        password: sha1(ruleForm.pass),
        code: ruleForm.code
      }
      Register(params)
        .then(res => {
          let data = res.data
          root.$message.success(data.message)
          menuchange(0)
          clearcountDown()
        })
        .catch(err => {
          console.log(err)
        })
    }
    //登录
    async function Logins() {
      let params = {
        username: ruleForm.username,
        password: sha1(ruleForm.pass),
        code: ruleForm.code
      }
      let res = await Login(params)
      if (res.data.resCode === 0) {
        root.$message.success(res.data.message)
      } else {
        root.$message.error(res.data.message)
      }
      console.log(res)
    }
    //声明对象类型的数据使用reactive
    const loginList = reactive(['登录', '注册'])
    //声明基础数据类型变量时使用
    const menuIdx = ref(0)
    const loginBtn = ref(true)
    //倒计时
    const timer = ref(null)
    const codeBtnStatus = reactive({
      status: false,
      text: '获取验证码'
    })
    const ruleForm = reactive({
      pass: '',
      username: '',
      code: '',
      password: ''
    })

    const rules = reactive({
      pass: [{ validator: validatePass, trigger: 'blur' }],
      username: [{ validator: validateUsername, trigger: 'blur' }],
      code: [{ validator: checkcode, trigger: 'blur' }],
      password: [{ validator: validatePass2, trigger: 'blur' }]
    })
    //声明生命周期
    onMounted(() => {
      // GetSms()
    })
    return {
      loginList,
      menuIdx,
      loginBtn,
      codeBtnStatus,
      ruleForm,
      rules,
      menuchange,
      submitForm,
      getSms
    }
  }
}
</script>

<style lang="scss">
#login {
  height: 100vh;
  background: #344a5f;
  .login-warp {
    width: 360px;
    margin: auto;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .menu-tab {
      text-align: center;
      li {
        display: inline-block;
        width: 88px;
        line-height: 36px;
        font-size: 14px;
        color: #fff;
        cursor: pointer;
        border-radius: 2px;
      }
      .current {
        background: rgba(0, 0, 0, 0.1);
      }
    }
    .login-ruleForm {
      margin-top: 39px;
      label {
        display: block;
        font-size: 14px;
        color: #fff;
        margin-bottom: 3px;
      }
      .item-form {
        margin-bottom: 13px;
      }
      .btn-submit {
        width: 100%;
        display: block;
      }
      .margin-top-19 {
        margin-top: 19px;
      }
    }
  }
}
</style>
