<template>
  <div id="login">
    <div class="login-warp">
      <ul class="menu-tab">
        <li
          v-for="(item,idx) in loginList"
          :key="idx"
          @click="menuchange(idx)"
          :class="{current:idx===menuIdx}"
        >{{item}}</li>
      </ul>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-ruleForm">
        <el-form-item label="邮箱" prop="username" class="item-form">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" class="item-form">
          <el-input
            type="text"
            v-model="ruleForm.pass"
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
              <el-button type="success" class="btn-submit">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="margin-top-19 btn-submit"
          >提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { stripscript,validateEmail } from "@/utils/validate";
export default {
  name: "loin",
  data() {
    //验证验证码
    var checkcode = (rule, value, callback) => {
      this.ruleForm.code = stripscript(value);
      value = this.ruleForm.code;
      let reg = /^[a-z0-9]{6}$/;
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (!reg.test(value)) {
        callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    //验证用户名
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateEmail(value)) {
        callback(new Error("用户名格式有误"));
      } else {
        callback();
      }
    };
    //验证密码
    var validatePass = (rule, value, callback) => {
      this.ruleForm.pass = stripscript(value);
      value = this.ruleForm.pass;
      let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!reg.test(value)) {
        callback(new Error("密码为6至20位数字+字母"));
      } else {
        callback();
      }
    };
    return {
      loginList: ["登录", "注册"],
      menuIdx: 0, //tab选中的顺序
      ruleForm: {
        pass: "",
        username: "",
        code: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: validateUsername, trigger: "blur" }],
        code: [{ validator: checkcode, trigger: "blur" }]
      }
    };
  },
  methods: {
    menuchange(idx) {
      this.menuIdx = idx;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss">
#login {
  height: 100vh;
  background: #344a5f;
  .login-warp {
    width: 330px;
    margin: auto;
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