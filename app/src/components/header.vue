<template lang="html">
  <div class="header">
    <div class="logo"></div>
    <div class="searchContainer">
      <div class="searchbox">
        <el-input placeholder="关键字" class="searchbox__input"
          v-model="keyword"
          v-on:keyup.enter.native="submitKeyword">
        </el-input>
        <div class="searchbox__icon"
          @click="submitKeyword"
        ></div>
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

    <div class="logout__link" @click="logout">退出</div>

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
import state from '../state/searchResult/state.js'
import { userState } from '../state/user/state.js'

require('../assets/scss/header.scss')

export default {
  data () {
    return {
      // keyword: '',
      keywordInput: '',
      userInfo: {
        avatar: require('../assets/images/user.png'),
        userName: 'ZZZZ'
      },
      showUserMenu: false,
      userMenu: [
        // {
        //   label: '个人资料',
        //   commend: ''
        // },
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
  computed: {
    keyword: {
      get () {
        return state.get('searchParams').query
      },
      set (newValue) {
        this.keywordInput = newValue
      }
    }
  },
  methods: {
    submitKeyword () {
      state.setSearchParams('field', 'keywords')
      state.setSearchParams('query', this.keywordInput)
      if (this.$route.name !== 'SearchResult') {
        this.$router.push('/SearchResult')
      }
    },
    logout () {
      sendRequest.logout.get().then((data) => {
        userState.set('isLogin', false)
        this.$router.push('/Login')
      })
    },
    clickUserMenu (command) {
      switch (command) {
        case '':
          this.$router.push('/UserManagement')
          break
        case 'favor':
          this.$router.push('/Favor')
          break
        case 'logout':
          this.logout()
          break
        default:
          break
      }
    }
  },
  created () {
    this.keyword = '设备'
    this.submitKeyword()
  }
}
</script>

<style lang="scss">
</style>
