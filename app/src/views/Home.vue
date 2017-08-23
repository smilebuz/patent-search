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
            <el-radio class='radio' v-model='applyTypeSelected' v-bind:label='type.value'> {{ type.message }} </el-radio>
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
        <img src="../assets/images/category_navigation.png" alt="" class="" v-on:click="categoryNav">
        <span v-on:click="categoryNav">分类导航</span>
      </el-col>
      <el-col :span='4' class="search-special">
        <img src="../assets/images/advanced_search.png" alt="" class="" v-on:click="advancedSearch">
        <span v-on:click='advancedSearch'>高级检索</span>
      </el-col>
      <el-col :span='4' class="search-special">
        <img src="../assets/images/my_collection.png" alt="" id="my-collection-img">
        <span>我的收藏</span>
      </el-col>
      <el-col :span='4' class="search-special">
        <img src="../assets/images/user_management.png" alt="" class="">
        <span>用户管理</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import state from '../state.js'
import bus from '../bus.js'
import { sendRequest } from '../Api'
// import Api from '../Api'

export default {
  name: 'Home',
  data () {
    return {
      header: 'INNOPRO',
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
      search_type: 'common',
      field: 'keywords',
      session: ''
    }
  },
  methods: {
    categoryNav () {
      this.$router.push('CategoryNav')
    },
    advancedSearch () {
      this.$router.push('AdvancedSearch')
    },
    search () {
      let params = {
        query: this.keyword,
        apply_type: this.applyTypeSelected,
        search_type: this.search_type,
        field: this.field,
        session_id: state.get('session_id')
        // per_page: state.get('per_page'),
        // page: state.get('page')
      }
      state.set('searchParams', params)
      sendRequest.search.post(state.get('searchParams')).then((data) => {
        bus.$emit('search', data)
        this.$router.push('Search')
      })
    }
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
