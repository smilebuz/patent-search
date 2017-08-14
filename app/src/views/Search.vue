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
            <div class='tab tab-order'>相关度</div>
            <div class='tab tab-order'>申请时间</div>
            <div class='tab tab-order'>价值度</div>
            <div class='tab tab-order'>潜在买卖数</div>
            <div class='tab tab-order'>相似专利数</div>
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
// import state from '../state.js'

import myheader from '../components/Header'
import myfilter from '../components/Filter'
import searchlist from '../components/SearchList'
import recommend from '../components/Recommend'
import searchbar from '../components/SearchBar'

export default {
  data () {
    return {
    }
  },
  mounted: function () {
  },
  methods: {
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
