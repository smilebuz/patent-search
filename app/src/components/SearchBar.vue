<template lang="html">
  <div>
    <el-row class='row'>
      <el-col :span='8' :offset='8'>
        <el-input v-model='keyword'></el-input>
      </el-col>
      <el-col :span='4'>
        <el-button type='primary' v-on:click='search'>检索</el-button>
        <router-link to='AdvancedSearch'>高级检索</router-link>
      </el-col>
    </el-row>
    <el-row class='row'>
      <el-col :span='8' :offset='8'>
        <el-radio class='radio' v-model='search_classification' label='keyword'>关键词查询</el-radio>
        <el-radio class='radio' v-model='search_classification' label='ipc'>分类号查询</el-radio>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyword: '',
      search_classification: ''
    }
  },
  methods: {
    search () {
    }
  }
}
</script>

<style lang="scss">
  .row {
    margin-bottom: 20px;
    button {
      border-color: #008080;
      background: #008080;
    }
  }
</style>
