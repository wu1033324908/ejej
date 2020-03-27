<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-16 14:46:41
 * @LastEditTime: 2020-03-04 15:31:13
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="login-container">
    <div class="title">欢迎登录E家易居业务管理平台</div>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="logo-container">
        <div class="logo"><img src="@/assets/index/logo.png" alt=""></div>
      </div>
      <el-form-item class="username" prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          auto-complete="on"
          placeholder="请输入用户名/账号"
        />
      </el-form-item>

      <el-form-item class="password" prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="passwordType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="请输入密码"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-checkbox v-model="savePassword" claas="savePassword">记住密码</el-checkbox>
      <div class="forget-password">忘记密码</div>
      <el-button
        :loading="loading"
        class="login-button"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登录</el-button>
    </el-form>
    <div class="foot"/>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (validateUsername == null) {
        callback(new Error('请输入正确的管理员用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('管理员密码长度应大于6'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      passwordType: 'password',
      savePassword: false,
      loading: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid && !this.loading) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.errmsg
            })
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: white;
$light_gray: #eee;

/* reset element-ui css */
.foot {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  p {
    color: #fff;
  }
}
.login-container {
  background:url('http://ejzx.oss-cn-qingdao.aliyuncs.com/user_id/65cc1087a11e4fa4a368b381bc0c4167.png?Expires=1893294055&OSSAccessKeyId=LTAI4FxoRFihXGmgadcfsrgE&Signature=T4JcP8r%2Fm%2BQ0Wa6qR9rT5MataBE%3D') no-repeat center;
  background-size: 100% 100%;
  .title {
    display: inline-block;
    position: relative;
    top: 130px;
    left: 50%;
    transform: translateX(-50%);
    color: rgb(255, 255, 255);
    font-size: 40px;
    letter-spacing: 6px;
    font-weight: 100;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      // color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: rgb(0, 0, 0) !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #1d88cd;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    color: black;
    background-color: rgba(197, 228, 254,0.8);
    position: absolute;
    left: 50%;
    top: 150px;
    right: 0;
    width: 434px;
    height: 486px;
    padding: 50px 50px 35px 50px;
    margin: 120px auto;
    .username {
      background-color: #fff;
    }
    .password {
      background-color: #fff;
    }
    .savePassword{
      display: inline-block;
    }
    .forget-password{
      display: inline-block;
      font-size: 14px;
      vertical-align: middle;
      float: right;
    }
    .login-button {
      margin-top: 24px;
      background-color: rgb(59, 117, 195);
      height: 50px;
    }
    .el-checkbox{
      span{
        font-size: 10px;
      }
    }
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .logo-container {
    position: relative;
    .logo {
      font-size: 26px;
      font-weight: 400;
      color: black;
      margin: 0px auto 20px auto;
      text-align: center;
      font-weight: bold;
      img{
        width: 120px;
      }
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
