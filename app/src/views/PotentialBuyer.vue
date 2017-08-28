<template lang="html">
  <div>
    <myHeader></myHeader>
    <searchbar></searchbar>
    <el-table :data="buyerTable" border align="left" class="table" @cell-click="loadApplicantInfo">
      <el-table-column prop="order" label="序号"></el-table-column>
      <el-table-column prop="applicant_name" label="卖家名称"></el-table-column>
      <el-table-column prop="area" label="所在地"></el-table-column>
      <el-table-column prop="found_year" label="成立时间"></el-table-column>
      <el-table-column prop="registration_capital" label="注册资金"></el-table-column>
      <el-table-column prop="annual_revenue" label="年营业额"></el-table-column>
      <el-table-column prop="owned_patents_number" label="拥有专利数"></el-table-column>
      <el-table-column prop="main_product_list" label="主营产品"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import myHeader from '../components/Header'
import searchbar from '../components/SearchBar'

import state from '../state.js'
import { sendRequest } from '../Api'

export default {
  data () {
    return {
      buyerTable: []
    }
  },
  methods: {
    loadApplicantInfo (cell, event) {
      if (event.label === '卖家名称') {
        state.set('applicant_id', cell.applicant_id)
        this.$router.push('/ApplicantInfo')
      }
    }
  },
  mounted () {
    sendRequest.potentialBuyer.get().then(data => {
      this.buyerTable = [...data.potential_buyer_list]
      for (let i = 1; i <= this.buyerTable.length; i++) {
        let buyer = this.buyerTable[i - 1]
        buyer.order = i
        buyer.main_product_list = buyer.main_product_list.join(';')
      }
    })
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
