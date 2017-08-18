<template lang="html">
  <div>
    <myheader></myheader>

    <div class='search'>
      <searchbar></searchbar>
      <el-row>
        <span>首页n条专利，共n条相关专利</span>
      </el-row>
    </div>

    <div class="toolbar">
      <el-row>
        <el-col :span='4'>
          <div class='tab-group'>
            <div class='tab' @click='switchSidebar("filter")'>过滤</div>
            <div class='tab' @click='switchSidebar("recentSearch")'>最近搜索</div>
            <div class='tab' @click='switchSidebar("categoryNav")'>分类导航</div>
          </div>
        </el-col>
        <el-col :span='8' :offset='2'>
          <div class='tab-group'>
            <div class='tab' @click='toggleDisplayType("abstract")'>摘要式</div>
            <div class='tab' @click='toggleDisplayType("table")'>表格式</div>
            <div class='tab'>保存</div>
            <div class='tab'>加入收藏</div>
            <div class='tab'>加入分析库</div>
          </div>
        </el-col>
        <el-col :span='8' :offset='1'>
          <div class='tab-group'>
            <div class='tab tab-order' v-for='(value, key) in sorts' :key='key' @click='sort(key, value.direction)'>
              {{ value.message }}
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class='main'>
      <el-row>
        <el-col :span='4'>
          <myfilter v-if='sideBarSelected === "filter"'></myfilter>
          <div v-else-if='sideBarSelected === "recentSearch"' id="recentSearch">
            <p v-for='item, index in recentSearch' @click=search(item)>{{ item.message }}</p>
          </div>
          <categoryNav v-else></categoryNav>
        </el-col>
        <el-col :span='17' :offset='2'>
          <searchlist :displayType='displayType'></searchlist>
          <recommend></recommend>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
import bus from '../bus.js'
import state from '../state.js'
import Api from '../Api'

import myheader from '../components/Header'
import myfilter from '../components/Filter'
import searchlist from '../components/SearchList'
import recommend from '../components/Recommend'
import searchbar from '../components/SearchBar'
import categoryNav from '../components/CategoryNav'

export default {
  data () {
    return {
      sideBarSelected: 'filter',
      displayType: 'abstract',
      sorts: {
        relevance: {
          message: '相关度',
          direction: 'decending'
        },
        apply_type: {
          message: '申请时间',
          direction: 'decending'
        },
        value_degree: {
          message: '价值度',
          direction: 'decending'
        },
        potential_buyer_number: {
          message: '潜在买家数',
          direction: 'decending'
        },
        similar_patent_number: {
          message: '相似专利数',
          direction: 'decending'
        }
      },
      recentSearch: [
        {
          message: '电力载波技术'
        },
        {
          message: '制冷装置'
        },
        {
          message: '国网冀北电力'
        }
      ]
    }
  },
  methods: {
    sort (target, direction) {
      let params = {
        target: target,
        direction: direction,
        session_id: state.get('session_id'),
        per_page: state.get('per_page'),
        page: state.get('page')
      }
      this.sorts[target].direction === 'decending' ? this.sorts[target].direction = 'ascending' : this.sorts[target].direction = 'decending'
      console.log(JSON.stringify(params))
      this.$http.post(Api.sort + '?access_token=' + state.get('token'), params)
        .then(function (response) {
          bus.$emit('sort', response.data.result)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    toggleDisplayType: function (type) {
      this.displayType = type
    },
    switchSidebar: function (type) {
      this.sideBarSelected = type
    },
    search: function (item) {
      let params = {
      }
      this.$http.post(Api.search, params)
        .then((response) => {
          this.sideBarSelected = 'filter'
          bus.$emit('search', response.data.result)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  watch: {
    sideBarSelected: function (type) {
      switch (type) {
        case 'recentSearch':
          let params = {}
          this.$http.get(Api.recentSearch, params)
            .then((response) => {

            })
            .catch((error) => {
              console.log(error)
            })
          break
        default:
          break
      }
    }
  },
  components: {
    myheader, myfilter, searchlist, recommend, searchbar, categoryNav
  }
}
</script>

<style lang="scss" scoped>
  .tab-group {
    display: flex;
    justify-content: space-between;
    .tab {
      flex: 1;
      border: 1px solid #000;
      border-right: none;
      padding-top: .5em;
      padding-bottom: .5em;
      cursor: default;
      &:last-child {
        border-right: 1px solid #000;
      }
    }
    .tab-order {
    }
  }
  .toolbar {
    margin-top: 2em;
    margin-bottom: 2em;
  }
  #recentSearch {
    text-align: left;
    padding-left: 1em;
    border: 1px solid #000;
  }
</style>
