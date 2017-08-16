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
            <div class='tab'>过滤</div>
            <div class='tab'>最近搜索</div>
            <div class='tab'>分类导航</div>
          </div>
        </el-col>
        <el-col :span='8' :offset='2'>
          <div class='tab-group'>
            <div class='tab'>摘要式</div>
            <div class='tab'>表格式</div>
            <div class='tab'>保存</div>
            <div class='tab'>加入收藏</div>
            <div class='tab'>加入分析库</div>
          </div>
        </el-col>
        <el-col :span='8' :offset='1'>
          <div class='tab-group'>
            <div class='tab tab-order' v-for='(value, key) in sorts' :key='key' @click='sort(key, value.direction)'>{{ value.message }}</div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class='main'>
      <el-row>
        <el-col :span='4'>
          <myfilter></myfilter>
        </el-col>
        <el-col :span='17' :offset='2'>
          <searchlist></searchlist>
          <recommend></recommend>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
import state from '../state.js'

import myheader from '../components/Header'
import myfilter from '../components/Filter'
import searchlist from '../components/SearchList'
import recommend from '../components/Recommend'
import searchbar from '../components/SearchBar'

export default {
  data () {
    return {
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
      }
    }
  },
  methods: {
    sort (target, direction) {
      let request = {
        target: target,
        direction: direction,
        session_id: '',
        per_page: 1,
        page: 1
      }
      this.$http.post('/api/sort', request)
        .then((response) => {
          state.set('patentList', response.data.result.patent_list)
          state.set('filterList', response.data.result.filter_sidebar_list)
          state.set('recommendList', response.data.result.recommend_list)
          direction === 'decending' ? direction = 'ascending' : direction = 'decending'
        })
        .then((error) => {
          console.log(error)
        })
    }
  },
  components: {
    myheader, myfilter, searchlist, recommend, searchbar
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
      &:last-child {
        border-right: 1px solid #000;
      }
    }
  }
  .toolbar {
    margin-top: 2em;
    margin-bottom: 2em;
  }
</style>
