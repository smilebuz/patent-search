<template lang="html">
  <div>
    <el-row class='row'>
      <el-col :span='8' :offset='8'>
        <el-input v-model='keyword'></el-input>
      </el-col>
      <el-col :span='4'>
        <el-button type='primary' v-on:click='search'>检索</el-button>
        <router-link to='/AdvancedSearch' tag='span' id="advanced-search">高级检索</router-link>
      </el-col>
    </el-row>
    <el-row class='row'>
      <el-col :span='8' :offset='8'>
        <el-radio class='radio' v-model='search_type' label='keyword'>关键词查询</el-radio>
        <el-radio class='radio' v-model='search_type' label='ipc'>分类号查询</el-radio>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import state from '../state.js'
import bus from '../bus.js'

export default {
  data () {
    return {
      keyword: '',
      search_type: '',
      field: 'keywords'
    }
  },
  methods: {
    search () {
      let params = {
        query: this.keyword,
        apply_type: 'inventions',
        search_type: this.search_type,
        field: this.field,
        session: state.get('session_id'),
        per_page: 3,
        page: 1
      }
      this.$http.post('/api/search', params)
        .then((response) => {
          bus.$emit('search', response.data.result)
          this.$router.push('/Search')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  created () {
    bus.$on('setKeyword', function (keyword) {
      this.keyword = keyword
    })
  }
}
</script>

<style lang="scss">
  .row {
    margin-top: 1.5em;
    margin-bottom: 1.5em;
    button {
      border-color: #008080;
      background: #008080;
    }
  }
  #advanced-search {
    margin-left: 1em;
    cursor: pointer;
  }
</style>
