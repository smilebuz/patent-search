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
      <!--el-col :span='8' :offset='8'>
        <el-radio class='radio' v-model='search_type' label='keyword'>关键词查询</el-radio>
        <el-radio class='radio' v-model='search_type' label='ipc'>分类号查询</el-radio>
      </el-col-->
      <el-col :span='8' :offset='8'>
        <el-row id='filter-group'>
          <el-col :span='8' class='filter-item' v-for='type, index in apply_type' :key='index'>
            <el-radio class='radio' v-model='search_filter' v-bind:label='type.value'> {{ type.message }} </el-radio>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import state from '../state.js'
import bus from '../bus.js'
import { sendRequest } from '../Api'

export default {
  data () {
    return {
      keyword: '',
      search_type: '',
      search_filter: '',
      apply_type: [
        {
          message: '发明专利',
          value: 'inventions'
        },
        {
          message: '实用新型专利',
          value: 'utility_medels'
        },
        {
          message: '外观专利',
          value: 'designs'
        }
      ],
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
      sendRequest.search.post(params).then((data) => {
        bus.$emit('search', data)
        this.$router.push('/Search')
      })
    }
  },
  created () {
    bus.$on('setKeyword', function (keyword) {
      this.keyword = keyword
      // this.$set(this, 'keyword', keyword)
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
  #filter-group {
    & .filter-item:first-child {
      text-align: left;
    }
    & .filter-item:last-child {
      text-align: right;
    }
  }
  #advanced-search {
    margin-left: 1em;
    cursor: pointer;
  }
</style>
