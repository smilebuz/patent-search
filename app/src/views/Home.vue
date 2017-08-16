<template>
  <div>
    <h1>{{ header }}</h1>
    <el-row id="search-row">
      <el-col :span='8' :push='8'>
        <el-row>
          <el-col :span='24'>
            <el-input v-model='keyword' id="keyword"></el-input>
          </el-col>
        </el-row>
        <el-row id="filter-group">
          <el-col :span='8' class='filter-item' v-for='type, index in apply_type' :key='index'>
            <el-radio class='radio' v-model='search_filter' v-bind:label='type.value'> {{ type.message }} </el-radio>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span='8' :push='8'>
        <el-row type='flex' align='middle'>
          <el-col :span='4' :push='2'>
            <el-button type='primary' v-on:click='search'>检索</el-button>
          </el-col>
          <el-col :span='8' :push='2'>
            <router-link to='AdvancedSearch' id='advanced-search' tag='span'>高级检索</router-link>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span='4' :offset='4' class="search-special">
        <img src="../assets/category_navigation.png" alt="" class="">
        <span>分类导航</span>
      </el-col>
      <el-col :span='4' class="search-special">
        <img src="../assets/advanced_search.png" alt="" class="" v-on:click='advancedSearch'>
        <span v-on:click='advancedSearch'>高级检索</span>
      </el-col>
      <el-col :span='4' class="search-special">
        <img src="../assets/my_collection.png" alt="" id="my-collection-img">
        <span>我的收藏</span>
      </el-col>
      <el-col :span='4' class="search-special">
        <img src="../assets/user_management.png" alt="" class="">
        <span>用户管理</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import state from '../state.js'
import Api from '../Api'
// import bus from '../Bus.js'

export default {
  name: 'Home',
  data () {
    return {
      header: 'INNOPRO',
      keyword: '',
      search_filter: '1',
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
      ]
    }
  },
  methods: {
    advancedSearch () {
      this.$router.push('AdvancedSearch')
    },
    search () {
      let keyword = this.keyword
      let request = {
        query: keyword,
        apply_type: 'inventions',
        search_type: 'common',
        field: 'keywords',
        per_page: 3,
        page: 1
      }
      // state.$emit('sendKeyword', keyword)
      this.$http.post(Api.search, request)
        .then((response) => {
          state.set('patentList', response.data.result.patent_list)
          state.set('filterList', response.data.result.filter_sidebar_list)
          state.set('recommendList', response.data.result.recommend_list)
          state.set('session_id', response.data.result.session_id)
          this.$router.push('Search')
        })
        .then((error) => {
          console.log(error)
        })
    }
  },
  mounted: function () {
    /*
    bus.$once('setToken', (token) => {
      console.log('token:' + token)
    })
    */
  }
}
</script>

<style lang="scss" scoped>
  $head-color: #00f;
  $head-font: 40px 'Source Sans Pro';
  h1 {
    margin-bottom: 50px;
    color: $head-color;
    font: $head-font;
  }
  #search-row {
    margin-bottom: 120px;
  }
  #filter-group {
    margin-top: 20px;
    & .filter-item:first-child {
      text-align: left;
    }
    & .filter-item:last-child {
      text-align: right;
    }
  }
  .search-special {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 150px;
    img {
      width: 114px;
      margin: 0 auto;
    }
    img,
    span {
      cursor: pointer;
    }
  }
  #my-collection-img {
    width: 98px;
  }
  #advanced-search {
    cursor: pointer;
  }
</style>
