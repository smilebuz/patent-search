<template lang="html">
  <div class="header">
    <div class="logo"></div>
    <div class="searchContainer">
      <div class="searchbox">
        <el-input placeholder="关键字" class="searchbox__input"
          v-model="keyword"
          v-on:keyup.enter.native="submitKeyword">
        </el-input>
        <div class="searchbox__icon"></div>
      </div>
      <router-link to="/AdvancedSearch" tag="div" class="advancedSearch__link">高级搜索</router-link>
    </div>

    <div class="userContainer"
      @mouseleave="showUserMenu = false">
      <div class="userDropdown__header"
        @mouseover="showUserMenu = true">
        <img :src="userInfo.avatar" alt="avatar"></img>
        <span>{{ userInfo.userName }}</span>
      </div>
      <div class="userDropdown__menu" v-if="showUserMenu">
        <div class="userDropdownMenu__item"
          v-for="(item, index) in userMenu"
          :key="item.command"
          @click="clickUserMenu(item.command)">
          {{ item.label }}
        </div>
      </div>
    </div>

    <div class="logout__link" to="/Login" tag="div">退出</div>

    <!--div class="header-user">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdownlink">用户</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command='manageProfile'>个人资料</el-dropdown-item>
          <el-dropdown-item command='jump2favor'>我的收藏</el-dropdown-item>
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div-->
  </div>
</template>

<script>
import { sendRequest } from '../Api'
import state from '../state.js'

export default {
  data () {
    return {
      keyword: '',
      userInfo: {
        avatar: require('../assets/images/user.png'),
        userName: 'ZZZZ'
      },
      showUserMenu: false,
      userMenu: [
        {
          label: '个人资料',
          commend: ''
        },
        {
          label: '我的收藏',
          command: 'favor'
        },
        {
          label: '退出',
          command: 'logout'
        }
      ]
    }
  },
  methods: {
    submitKeyword () {
      state.setSearchParams('keyword', this.keyword)
    },
    clickUserMenu (command) {
      switch (command) {
        case '':
          this.$router.push('/UserManagement')
          break
        case 'logout':
          let params = {}
          sendRequest.logout.post(params).then((data) => {
            state.set('isLogin', false)
            this.$router.push('/Home')
          })
          break
        case 'favor':
          this.$router.push('/Favor')
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss">
  $company-name-color: #008080;
  $border-color: #383838;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    width: 100%;
    top: 0;
    font-size: 14px;
    color: #fff;
    background: #434343;
    .header-user {
      font-size: 13px;
      #help {
        cursor: pointer;
      }
    }
  }
  .logo {
    width: 310px;
    height: inherit;
    border-right: 1px solid $border-color;
    background: url('../assets/images/logo.png')  20px center no-repeat;
  }
  .searchContainer {
    display: flex;
    align-items: center;
    justify-content: space-around;
    //width: 500px;
    flex: 1;
    border-right: 1px solid $border-color;
    .searchbox {
      width: 650px;
      height: 35px;
      display: flex;
      .searchbox__input {
        height: inherit;
        flex: 1;
        .el-input__inner {
          height: 100%;
          border-radius: 0;
        }
      }
      .searchbox__icon {
        width: 45px;
        cursor: pointer;
        background: url('../assets/images/search.png') center no-repeat #46b6e9;
        background-size: 50%;
      }
    }
    .advancedSearch__link {
      height: 30px;
      width: 75px;
      line-height: 30px;
      text-align: center;
      border-radius: 2px;
      cursor: pointer;
      background: #8ebe73;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .userContainer {
    display: flex;
    flex-direction: column;
    .userDropdown__header {
      height: 45px;
      line-height: 45px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100px;
      padding-left: 10px;
      padding-right: 10px;
      border-right: 1px solid $border-color;
      cursor: pointer;
    }
    .userDropdown__menu {
      width: 121px;
      position: absolute;
      top: 45px;
      .userDropdownMenu__item {
        height: 30px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        background: #434343;
        &:hover {
          background: #383838;
        }
      }
    }
  }
  .logout__link {
    width: 60px;
    padding-right: 30px;
    height: 100%;
    line-height: 45px;
    text-align: right;
    cursor: pointer;
    background: url('../assets/images/out.png') 10px center no-repeat;
    &:hover {
      background-color: #626262;
    }
  }
</style>
