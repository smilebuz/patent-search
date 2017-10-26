<template>
  <div class="login">
    <div class="login__form">
      <img src="../assets/images/logo.png" alt="logo" class="login__item">
      <div class="login__form">
        <el-input placeholder="Username" class="form__input login__item"
          v-model="loginForm.account"
        ></el-input>
        <el-input placeholder="Password" type="password" class="form__input login__item"
          v-model="loginForm.password"
        ></el-input>
        <el-button class="login__button login__item" type="primary"
          @click="login"
        >登录</el-button>
      </div>
      <div class="login__options login__item">
        <el-checkbox v-model="loginForm.rememberPw">记住密码</el-checkbox>
        <div class="login__links">
          <router-link to="" id="forgetpw" tag="span" class="login__link">忘记密码</router-link>
          <router-link to="/Register" tag="span" class="login__link">立即注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import state from '../state'
// import bus from '../Bus.js'
import { sendRequest } from '../Api'

export default {
  name: 'Login',
  data () {
    return {
      loginParams: {
        account: '',
        password: ''
      },
      loginForm: {
        account: '',
        password: '',
        rememberPw: false
      }
    }
  },
  methods: {
    login () {
      for (let prop in this.loginParams) {
        if (this.loginParams.hasOwnProperty(prop)) {
          this.loginParams[prop] = this.loginForm[prop]
        }
      }
      sendRequest.login.post(this.loginParams).then(data => {
        state.set('isLogin', true)
        state.set('userId', data.user_id)
        this.$router.push('Home')
      })
    }
  }
}
</script>

<style lang="scss">
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .login__form {
    display: flex;
    flex-direction: column;
    width: 280px;
  }
  .login__item {
    margin-bottom: 20px;
  }
  .login__button {
    color: #fff;
    border-color: #3fb5e8;
    border-radius: 50px;
    background: #3fb5e8;
  }
  .login__options {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }
  .login__link {
    cursor: pointer;
    &:hover {
      color: #3fb5e8;
    }
  }
</style>
