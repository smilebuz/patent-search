<template lang="html">
  <div>
    <myHeader></myHeader>
    <searchbar></searchbar>
    <el-table :data='buyerTable' border align='left' class="table">
      <el-table-column prop='order' label='序号'></el-table-column>
      <el-table-column prop='buyer' label='卖家名称'></el-table-column>
      <el-table-column prop='area' label='所在地'></el-table-column>
      <el-table-column prop='foundYear' label='成立时间'></el-table-column>
      <el-table-column prop='capital' label='注册资金'></el-table-column>
      <el-table-column prop='revenue' label='年营业额'></el-table-column>
      <el-table-column prop='patentNumber' label='拥有专利数'></el-table-column>
      <el-table-column prop='mainProducts' label='主营产品'></el-table-column>
    </el-table>
  </div>
</template>

<script>
import myHeader from '../components/Header'
import searchbar from '../components/SearchBar'

export default {
  data () {
    return {
      buyerTable: []
    }
  },
  methods: {
    refreshTable: function (data) {
    }
  },
  components: {
    myHeader, searchbar
  }
}
</script>

<style lang="scss">
  .table {
    width: 70%;
    margin: 0 auto;
  }
</style>
