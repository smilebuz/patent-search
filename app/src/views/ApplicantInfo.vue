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
        <div v-else class="product-container">
          <el-tag type="gray" v-for="(product, index) in mainProducts" :key="index" class="tag">
            <span @click="search(product)">
              {{ product }}
            </span>
          </el-tag>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import myHeader from '../components/Header'
import searchbar from '../components/SearchBar'

import state from '../state/searchResult/state.js'
// import bus from '../bus.js'
import { sendRequest } from '../Api'

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
      purchasePowerTable: [],
      mainProducts: []
    }
  },
  methods: {
    fillInfo: function (data) {
      // 申请人信息
      this.infoTable.push({title: '申请人名称', text: data.name})
      this.infoTable.push({title: '地址', text: data.address})
      this.infoTable.push({title: '联系人', text: data.contact_person})
      this.infoTable.push({title: '联系电话', text: data.contact_number})
      this.infoTable.push({title: '邮箱', text: data.email})
      this.infoTable.push({title: '网址', text: data.website})
      this.infoTable.push({title: '法人代表', text: data.legal_representative})
      this.infoTable.push({title: '注册资本', text: data.registration_capital})
      this.infoTable.push({title: '注册时间', text: data.registration_date})
      this.infoTable.push({title: '经营状态', text: data.management_state})
      this.infoTable.push({title: '工商注册号', text: data.business_registration_no})
      this.infoTable.push({title: '组织机构代码', text: data.organization_code})
      this.infoTable.push({title: '统一信用代码', text: data.uniform_credit_code})
      this.infoTable.push({title: '营业期限', text: data.business_term})
      this.infoTable.push({title: '核准日期', text: data.approval_date})
      this.infoTable.push({title: '登记机关', text: data.registration_authority})
      this.infoTable.push({title: '注册地址', text: data.registration_address})
      this.infoTable.push({title: '企业类型', text: data.enterprise_type})
      this.infoTable.push({title: '行业', text: data.industry})
      this.infoTable.push({title: '经营范围', text: data.business_scope})
      // 申请人购买力
      this.purchasePowerTable.push({title: '申请人名称', text: data.name})
      this.purchasePowerTable.push({title: '注册资本', text: data.registration_capital})
      this.purchasePowerTable.push({title: '营业收入', text: data.business_income})
      this.purchasePowerTable.push({title: '营业额', text: data.turnover})
      this.purchasePowerTable.push({title: '人数规模', text: data.person_number})
      this.purchasePowerTable.push({title: '购买增长率', text: data.purchase_growth_rate})
      // 申请人主营产品
      this.mainProducts = [...data.main_product_list]
    },
    loadProducts: function (productObj) {
      let keys = Object.keys(productObj)
      if (productObj.constructor === Object && keys !== []) {
        console.log(keys)
        this.recLevel += 1
        for (let key of keys) {
          this.mockProduct.push({ caonima: key })
          this.loadProducts(productObj[key]) // 递归
        }
      } else {
        // 最后一层 产品数组
        console.log(this.mockProduct)
      }
    },
    search: function (product) {
      state.setSearchParams('query', product)
    }
  },
  mounted () {
    let ids = {
      applicantId: state.get('applicantId')
    }
    sendRequest.applicant.get(null, ids).then(data => {
      this.fillInfo(data)
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
  .product-container {
    text-align: left;
    .tag {
      margin: .5em;
      cursor: pointer;
    }
  }
</style>
