<template lang="html">
  <div>
    <myHeader></myHeader>
    <searchbar></searchbar>
    <el-tabs type='border-card' class="tab" v-model='activeTab' @tab-click='checkInfo'>
      <el-tab-pane v-for='tab, index in tabs' :key='index' v-bind:label='tab.message' v-bind:name='tab.value'>
        <el-table v-if='activeTab === "info"' :data='infoTable' border align='left'>
          <el-table-column prop='title' label='信息名称' class='table-row-title'></el-table-column>
          <el-table-column prop='text' label='信息内容'></el-table-column>
        </el-table>
        <p v-if='activeTab === "claimInfo"'></p>
        <p v-if='activeTab === "specification"'></p>
        <el-table v-if='activeTab === "legalStatus"' :data='legalTable' border>
          <el-table-column prop='date' label='年份'></el-table-column>
          <el-table-column prop='status' label='法律状态'></el-table-column>
          <el-table-column prop='countryCode' label='相关国家代码'></el-table-column>
          <el-table-column prop='patentNo' label='专利号'></el-table-column>
          <el-table-column prop='country' label='专利国家'></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import myHeader from '../components/Header'
import searchbar from '../components/SearchBar'

export default {
  data () {
    return {
      activeTab: 'info',
      tabs: [
        {
          message: '著录项目信息',
          value: 'info'
        },
        {
          message: '权利要求',
          value: 'claimInfo'
        },
        {
          message: '说明书',
          value: 'specification'
        },
        {
          message: '法律状态',
          value: 'legalStatus'
        },
        {
          message: '相似专利',
          value: 'similarPatent'
        }
      ],
      infoTable: [
      ],
      legalTable: [
      ]
    }
  },
  methods: {
    checkInfo: (tab, event) => {
    },
    fillInfo (info) {
      let bibliographicInfo = info.bibliographicInformation
      let legalStatus = info.legalStatusList
      // 著录项目信息
      this.infoTable.push({title: '专利名称', text: bibliographicInfo.inventionTitle})
      this.infoTable.push({title: '申请号', text: bibliographicInfo.applicationNo})
      this.infoTable.push({title: '申请日', text: bibliographicInfo.applicationDate})
      this.infoTable.push({title: '申请人', text: bibliographicInfo.applicant})
      this.infoTable.push({title: '发明人', text: bibliographicInfo.inventorList.join(' ')})
      this.infoTable.push({title: '国际专利分类号', text: bibliographicInfo.ipcMainClassificationNo})
      this.infoTable.push({title: '优先权号', text: ''})
      this.infoTable.push({title: '摘要', text: bibliographicInfo.abstractInfo})
      // 法律状态
      for (let i = 0; i < legalStatus.length; i++) {
        let legalItem = legalStatus[i]
        let item = {
          date: legalItem.date,
          status: legalItem.status,
          countryCode: legalItem.countryCode,
          patentNo: legalItem.patentNo,
          country: legalItem.country
        }
        this.legalTable.push(item)
      }
    }
  },
  mounted () {
    this.$http.get('/api/patents/wzw')
      .then((response) => {
        this.fillInfo(response.data.result)
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
    width: 60%;
    margin: 0 auto;
  }
  .table-row-title {
    width: 20%;
  }
</style>
