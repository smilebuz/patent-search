<template lang="html">
  <div>
    <el-row class="row">
      <el-col :span="8" :offset="8">
        <el-input v-model="keyword"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" v-on:click="jump2search">检索</el-button>
        <router-link to="/AdvancedSearch" tag="span" id="advanced-search">高级检索</router-link>
      </el-col>
    </el-row>
    <el-row class="row">
      <!--el-col :span="8" :offset="8">
        <el-radio class="radio" v-model="search_type" label="keyword">关键词查询</el-radio>
        <el-radio class="radio" v-model="search_type" label="ipc">分类号查询</el-radio>
      </el-col-->
      <el-col :span="8" :offset="8">
        <el-row id="filter-group">
          <el-col :span="8" class="filter-item" v-for="type, index in apply_type" :key="index">
            <el-radio class="radio" v-model="applyTypeSelected" v-bind:label="type.value">
              {{ type.message }}
            </el-radio>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import bus from '../bus.js'

import state from '../state.js'
import { sendRequest } from '../Api'

export default {
  data () {
    return {
      keyword: '',
      applyTypeSelected: '',
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
      searchType: 'common'
    }
  },
  methods: {
    jump2search () {
      state.setSearchParams('query', this.keyword)
      state.setSearchParams('apply_type', this.applyTypeSelected)
      state.setSearchParams('search_type', this.searchType)
      this.$router.push('/Search')
    }
  },
  created () {
    bus.$off('updateSearchParams')
    bus.$on('updateSearchParams', searchParams => {
      this.keyword = searchParams.query // 需要箭头函数的this
      this.applyTypeSelected = searchParams.apply_type
      sendRequest.search.post(state.get('searchParams')).then((data) => {
        bus.$emit('search', data)
      })
    })
  },
  mounted () {
    this.keyword = state.get('searchParams').query // 从Home页进行的搜索
    this.applyTypeSelected = state.get('searchParams').apply_type
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
