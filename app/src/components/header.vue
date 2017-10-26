<template lang="html">
  <div class="header">
    <img src="../assets/images/logo.png" alt="logo"></img>
    <div class="header-user">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdownlink">用户</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command='manageProfile'>个人资料</el-dropdown-item>
          <el-dropdown-item command='jump2favor'>我的收藏</el-dropdown-item>
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <router-link to="" tag="span" id="help">帮助</router-link>
    </div>
  </div>
</template>

<script>
import { sendRequest } from '../Api'
import state from '../state.js'

export default {
  data () {
    return {}
  },
  methods: {
    clickLogo () {
      this.$router.push('/Home')
    },
    handleCommand (command) {
      switch (command) {
        case 'manageProfile':
          this.$router.push('/UserManagement')
          break
        case 'exit':
          let params = {}
          sendRequest.logout.post(params).then((data) => {
            state.set('isLogin', false)
            this.$router.push('/Home')
          })
          break
        case 'jump2favor':
          this.$router.push('/Favor')
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  $company-name-color: #008080;
  .header {
    background: #434343;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1em;
    padding-left: 20px;
    padding-right: 50px;
    .company-name {
      color: $company-name-color;
      font-size: 28px;
      font-weight: 700;
      cursor: pointer;
    }
    .header-user {
      font-size: 13px;
      #help {
        cursor: pointer;
      }
    }
  }
</style>
