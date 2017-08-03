<template lang="html">
  <div class="header">
    <span class="company-name">{{ header }}</span>
    <div class="header-user">
      <el-dropdown @command='handleCommand'>
        <span class='el-dropdownlink'>用户</span>
        <el-dropdown-menu slot='dropdown'>
          <el-dropdown-item>个人资料</el-dropdown-item>
          <el-dropdown-item>我的收藏</el-dropdown-item>
          <el-dropdown-item command='exit'>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <router-link to='' tag='span' id="help">帮助</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      header: 'INNOPRO专利精准推荐系统'
    }
  },
  methods: {
    handleCommand (command) {
      switch (command) {
        case 'exit':
          this.$router.push('Home')
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    padding-right: 50px;
    .company-name {
      color: $company-name-color;
      font-size: 28px;
      font-weight: 700;
    }
    .header-user {
      font-size: 13px;
      #help {
        cursor: pointer;
      }
    }
  }
</style>
