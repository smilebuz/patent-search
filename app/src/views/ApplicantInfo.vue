<template lang="html">
  <div>
    <myHeader></myHeader>
    <searchbar></searchbar>
    <el-tabs type='border-card' class='tab' v-model='activeTab'>
      <el-tab-pane v-for='tab, index in tabs' :key='index' v-bind:label='tab.message' v-bind:name='tab.value'>
        <el-table v-if='activeTab === "applicant"' :data='infoTable' border align='left'>
          <el-table-column prop='title' label='信息名称' class='table-row-title'></el-table-column>
          <el-table-column prop='text' label='信息内容'></el-table-column>
        </el-table>
        <el-table v-else-if='activeTab === "purchasePower"' :data='purchasePowerTable' border align='left'>
          <el-table-column prop='title' label='信息名称' class='table-row-title'></el-table-column>
          <el-table-column prop='text' label='信息内容'></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import myHeader from '../components/Header'
import searchbar from '../components/SearchBar'

import state from '../state.js'
// import { sendRequest } from '../Api'

export default {
  data () {
    return {
      activeTab: 'applicant',
      tabs: [
        {
          message: '申请人',
          value: 'applicant'
        },
        {
          message: '申请人购买力',
          value: 'purchasePower'
        },
        {
          message: '申请人主营产品',
          value: 'mainProduct'
        }
      ],
      infoTable: [],
      purchasePowerTable: []
    }
  },
  methods: {
    fillInfo: function (data) {
      // 申请人信息
      this.infoTable.push({title: '申请人名称', text: data.name})
      this.infoTable.push({title: '地址', text: data.address})
      this.infoTable.push({title: '联系人', text: data.contactPerson})
      this.infoTable.push({title: '联系电话', text: data.contactNumber})
      this.infoTable.push({title: '邮箱', text: data.email})
      this.infoTable.push({title: '网址', text: data.website})
      this.infoTable.push({title: '法人代表', text: data.legalRepresentative})
      this.infoTable.push({title: '注册资本', text: data.registeredCapital})
      this.infoTable.push({title: '注册时间', text: data.registrationDate})
      this.infoTable.push({title: '经营状态', text: data.managementState})
      this.infoTable.push({title: '工商注册号', text: data.businessRegistrationNo})
      this.infoTable.push({title: '组织机构代码', text: data.organizationCode})
      this.infoTable.push({title: '统一信用代码', text: data.uniformCreditCode})
      this.infoTable.push({title: '营业期限', text: data.businessTerm})
      this.infoTable.push({title: '核准日期', text: data.approvalDate})
      this.infoTable.push({title: '登记机关', text: data.registrationAuthority})
      this.infoTable.push({title: '注册地址', text: data.registrationAddress})
      this.infoTable.push({title: '企业类型', text: data.enterpriseType})
      this.infoTable.push({title: '行业', text: data.industry})
      this.infoTable.push({title: '经营范围', text: data.businessScope})
      // 申请人购买力
      this.purchasePowerTable.push({title: '申请人名称', text: data.name})
      this.purchasePowerTable.push({title: '注册资本', text: data.registrationCapital})
      this.purchasePowerTable.push({title: '营业收入', text: data.businessIncome})
      this.purchasePowerTable.push({title: '营业额', text: data.turnover})
      this.purchasePowerTable.push({title: '人数规模', text: data.personNumber})
      this.purchasePowerTable.push({title: '购买增长率', text: data.purchaseGrowthRate})
    }
  },
  mounted () {
    let url = '/api/organizations/' + state.get('patent_id')
    this.$http.get(url)
      .then((response) => {
        this.fillInfo(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  components: {
    myHeader, searchbar
  }
}
</script>

<style lang="scss">
  .tab {
    width: 70%;
    margin: 0 auto;
  }
</style>
