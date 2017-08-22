<template lang="html">
  <div class="recommend">
    <p>相关推荐</p>
    <div>
      <p>关键词</p>
      <el-tag type='gray' v-for='keyword, index in keyword_list' :key='index' class="recommend-item">
        <span @click='search(keyword)'>{{ keyword }}</span>
      </el-tag>
    </div>
    <div>
      <p>IPC</p>
      <el-tag type='gray' v-for='ipc, index in ipc_main_classification_list' :key='index' class='recommend-item'>
        <span @click='search(ipc)'>{{ ipc }}</span>
      </el-tag>
    </div>
    <div>
      <p>申请人</p>
      <el-tag type='gray' v-for='applicant, index in applicant_list' :key='index' class='recommend-item'>
        <span @click='search(applicant)'>{{ applicant }}</span>
      </el-tag>
    </div>
    <div>
      <p>产品</p>
      <el-tag type='gray' v-for='product, index in product_list' :key='index' class='recommend-item'>
        <span @click='search(product)'>{{ product }}</span>
      </el-tag>
    </div>
  </div>
</template>

<script>
import state from '../state.js'
import bus from '../bus.js'
import { sendRequest } from '../Api'

export default {
  data () {
    return {
      product_list: [],
      keyword_list: [],
      ipc_main_classification_list: [],
      applicant_list: []
    }
  },
  methods: {
    search: function (keyword) {
      let params = {
        query: keyword,
        apply_type: '',
        search_type: 'common',
        field: 'keywords',
        session_id: state.get('session_id'),
        per_page: state.get('per_page'),
        page: state.get('page')
      }
      sendRequest.search.post(params).then((data) => {
        bus.$emit('search', data)
      })
    },
    refreshList () {
      this.product_list.splice(0, this.product_list.length)
      this.keyword_list.splice(0, this.keyword_list.length)
      this.ipc_main_classification_list.splice(0, this.ipc_main_classification_list.length)
      this.applicant_list.splice(0, this.applicant_list.length)
      let recommendList = state.get('recommendList')
      this.product_list = recommendList.product_list
      this.keyword_list = recommendList.keyword_list
      this.ipc_main_classification_list = recommendList.ipc_main_classification_list
      this.applicant_list = recommendList.applicant_list
    }
  },
  created () {
    bus.$on('search', data => {
      state.set('patentList', data.patent_list)
      state.set('filterList', data.filter_sidebar_list)
      state.set('recommendList', data.recommend_list)
      state.set('session_id', data.session_id)
      this.refreshList()
    })
  },
  mounted () {
    this.refreshList()
  }
}
</script>

<style lang="scss">
  .recommend {
    text-align: left;
    .recommend-item {
      margin-right: 1em;
      margin-bottom: 1em;
    }
  }
</style>
