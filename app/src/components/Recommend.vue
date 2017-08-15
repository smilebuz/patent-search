<template lang="html">
  <div class="recommend">
    <p>相关推荐</p>
    <div>
      <p>关键词</p>
      <el-tag type='gray' v-for='keyword, index in keyword_list' :key='index' class="recommend-item">{{ keyword }}</el-tag>
    </div>
    <div>
      <p>IPC</p>
      <el-tag type='gray' v-for='ipc, index in ipc_main_classification_list' :key='index' class='recommend-item'>{{ ipc }}</el-tag>
    </div>
    <div>
      <p>申请人</p>
      <el-tag type='gray' v-for='applicant, index in applicant_list' :key='index' class='recommend-item'>{{ applicant }}</el-tag>
    </div>
    <div>
      <p>产品</p>
      <el-tag type='gray' v-for='product, index in product_list' :key='index' class='recommend-item'>{{ product }}</el-tag>
    </div>
  </div>
</template>

<script>
import state from '../state.js'

export default {
  data () {
    return {
      product_list: [],
      keyword_list: [],
      ipc_main_classification_list: [],
      applicant_list: []
    }
  },
  mounted: function () {
    let recommendList = state.get('recommendList')
    this.product_list = recommendList.product_list
    this.keyword_list = recommendList.keyword_list
    this.ipc_main_classification_list = recommendList.ipc_main_classification_list
    this.applicant_list = recommendList.applicant_list
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
