<template lang="html">
  <div class="">
    <myheader></myheader>
    <searchbar></searchbar>
    <el-row>
      <el-col :span="4" class="favor-collapse">
        <p class="collapse-title">我的收藏</p>
        <p v-for="favor in favors" :key="favor.id" class="favor-item" @click="fetchFavorPatents(favor.id)">{{ favor.name }}</p>
      </el-col>
      <el-col :span="17" :offset="2">
        <el-table ref="favorTable" border :data="favorList">
          <el-table-column v-for="column in favorColumns" :key="column.label" :prop="column.prop" :label="column.label"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import myheader from '../components/Header'
import searchbar from '../components/SearchBar'

import { sendRequest } from '../Api'

export default {
  data () {
    return {
      favors: [],
      favorList: [],
      favorColumns: [
        {
          'prop': '',
          'label': '专利类型'
        },
        {
          'prop': '',
          'label': '申请号'
        },
        {
          'prop': '',
          'label': '专利名称'
        },
        {
          'prop': '',
          'label': '申请人'
        },
        {
          'prop': '',
          'label': '发明人'
        },
        {
          'prop': '',
          'label': '申请日'
        },
        {
          'prop': '',
          'label': '分类号'
        }
      ]
    }
  },
  methods: {
    fetchFavorPatents (favorId) {
      alert(favorId)
    }
  },
  mounted () {
    sendRequest.getFavor.get().then(data => {
      this.favors = [...data]
    })
  },
  components: {
    myheader, searchbar
  }
}
</script>

<style lang="scss" scoped>
  .favor-collapse {
    .collapse-title,
    .favor-item {
      width: 90%;
      margin: 0 auto;
      padding-top: .5em;
      padding-bottom: .5em;
      border: 1px solid #008080;
      border-bottom: none;
    }
    .collapse-title {
      color: #fff;
      background: #008080;
    }
    .favor-item {
      border: 1px solid #000;
      border-bottom: none;
      cursor: pointer;
    }
    .favor-item:last-child {
      border-bottom: 1px solid #000;
    }
  }
</style>
