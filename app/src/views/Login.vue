<template>
  <div class="login">
    <div class="login__form">
      <img src="../assets/images/logo-login.png" alt="logo" class="login__item">
      <div class="login__form">
        <el-input placeholder="Username" class="form__input login__item"
          v-model="loginForm.username"
        ></el-input>
        <el-input placeholder="Password" type="password" class="form__input login__item"
          v-model="loginForm.password"
          v-on:keyup.enter.native="login"
        ></el-input>
        <el-button class="login__button login__item" type="primary"
          @click="login"
        >登录</el-button>
      </div>
      <div class="login__options login__item">
        <!-- <el-checkbox v-model="loginForm.rememberPw">记住密码</el-checkbox> -->
        <div class="login__links">
          <!-- <router-link to="" id="forgetpw" tag="span" class="login__link">忘记密码</router-link> -->
          <router-link to="/Register" tag="span" class="login__link">立即注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userState } from '../state/user/state.js'
// import bus from '../Bus.js'
import { sendRequest } from '../Api'

require('../assets/scss/login.scss')

export default {
  name: 'Login',
  data () {
    return {
      loginParams: {
        username: '',
        password: ''
      },
      loginForm: {
        username: '',
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
        userState.set('isLogin', true)
        userState.set('userId', data.user_id)
        userState.set('username', data.username)
        this.$router.push('SearchResult')
      }).catch(errorInfo => {
        console.log('error:', errorInfo.message)
      })
    }
  }
}
</script>

<style lang="scss">
</style>
