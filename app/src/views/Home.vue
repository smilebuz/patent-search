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
import bus from '../bus.js'
import Api from '../Api'

export default {
  name: 'Home',
  data () {
    return {
      header: 'INNOPRO',
      keyword: '',
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
      field: 'keywords',
      search_type: 'common'
    }
  },
  methods: {
    advancedSearch () {
      this.$router.push('AdvancedSearch')
    },
    search () {
      let params = {
        query: this.keyword,
        apply_type: this.search_filter,
        search_type: this.search_type,
        field: this.field,
        session_id: state.get('session_id'),
        per_page: 3,
        page: 1
      }
      this.$http.post(Api.search, params)
        .then((response) => {
          bus.$emit('search', response.data.result)
          this.$router.push('Search')
        })
        .catch((error) => {
          console.log('error', error)
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
