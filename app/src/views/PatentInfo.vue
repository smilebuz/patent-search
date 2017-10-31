<template lang="html">
  <div class="info">
    <div class="info__title">
      <img src="" alt="返回上一页"></img>
      <span>{{ patentId }}</span>
    </div>
    <el-tabs type="border-card" class="tab" v-model="activeTab" @tab-click="switchTab">
      <el-tab-pane v-for="(tab, index) in tabs" :key="index" v-bind:label="tab.message" v-bind:name="tab.value">

        <el-table v-if="activeTab === 'info'" :data="infoTable" border align="left">
          <el-table-column prop="title" label="信息名称" class="table-row-title"></el-table-column>
          <el-table-column prop="text" label="信息内容"></el-table-column>
        </el-table>

        <p v-if="activeTab === 'claimInfo'" v-for="(claim, index) in claimList" :key="index" class="para">{{ claim }}</p>

        <div v-if="activeTab === 'specification'" class="specification">
          <h4 class="specification-title">{{ specification.technicalField.title }}</h4>
          <p v-for="item, index in specification.technicalField.text" :key="index" class="para">{{ item }}</p>
          <h4 class="specification-title">{{ specification.backgroundArt.title }}</h4>
          <p v-for="item, index in specification.backgroundArt.text" :key="index" class="para">{{ item }}</p>
          <h4 class="specification-title">{{ specification.disclosure.title }}</h4>
          <p v-for="item, index in specification.disclosure.text" :key="index" class="para">{{ item }}</p>
          <h4 class="specification-title">{{ specification.descofPic.title }}</h4>
          <p v-for="item, index in specification.descofPic.text" :key="index" class="para">{{ item }}</p>
          <h4 class="specification-title">{{ specification.modeforInvention.title }}</h4>
          <p v-for="item, index in specification.modeforInvention.text" :key="index" class="para">{{ item }}</p>
        </div>

        <el-table v-if="activeTab === 'legalStatus'" :data="legalTable" border>
          <el-table-column prop="date" label="年份"></el-table-column>
          <el-table-column prop="status" label="法律状态"></el-table-column>
          <el-table-column prop="countryCode" label="相关国家代码"></el-table-column>
          <el-table-column prop="patentNo" label="专利号"></el-table-column>
          <el-table-column prop="country" label="专利国家"></el-table-column>
        </el-table>

        <el-table v-if="activeTab === 'similarPatent'" :data="patentTable" border align="center">
          <el-table-column prop="applyType" label="专利类型"></el-table-column>
          <el-table-column prop="inventionTitle" label="相似专利名称"></el-table-column>
          <el-table-column prop="applicant" label="申请人"></el-table-column>
          <el-table-column prop="inventorList" label="发明人"></el-table-column>
          <el-table-column prop="ipcClassificationNumber" label="分类号"></el-table-column>
          <el-table-column prop="productCategory" label="产品分类"></el-table-column>
          <el-table-column prop="nationalEconomyCategory" label="国民经济分类"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import state from '../state.js'
import { sendRequest } from '../Api'

export default {
  data () {
    return {
      activeTab: 'info',
      patentId: '',
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
      infoTable: [],
      claimList: [],
      specification: {
        technicalField: {
          title: '技术领域',
          text: []
        },
        backgroundArt: {
          title: '背景技术',
          text: []
        },
        disclosure: {
          title: '发明内容',
          text: []
        },
        descofPic: {
          title: '附图说明',
          text: []
        },
        modeforInvention: {
          title: '具体实施方式',
          text: []
        }
      },
      legalTable: [],
      patentTable: []
    }
  },
  methods: {
    switchTab (tab, event) {
      if (this.activeTab === 'similarPatent') {
        let ids = {
          patentId: state.get('patentId')
        }
        sendRequest.similarPatent.get(null, ids).then(data => {
          this.refreshSimPanel(data)
        })
      }
    },
    fillInfo (info) {
      let bibliographicInfo = {...info.bibliographicInformation}
      // 著录项目信息
      this.infoTable.push({title: '专利名称', text: bibliographicInfo.inventionTitle})
      this.infoTable.push({title: '申请号', text: bibliographicInfo.applicationNo})
      this.infoTable.push({title: '申请日', text: bibliographicInfo.applicationDate})
      this.infoTable.push({title: '申请人', text: bibliographicInfo.applicant})
      this.infoTable.push({title: '发明人', text: bibliographicInfo.inventorList.join(' ')})
      this.infoTable.push({title: '国际专利分类号', text: bibliographicInfo.ipcMainClassificationNo})
      this.infoTable.push({title: '优先权号', text: ''})
      this.infoTable.push({title: '摘要', text: bibliographicInfo.abstractInfo})
      // 权利要求
      this.claimList = [...info.claimInformation.claimTextList]
      // 说明书
      this.specification.technicalField.text = [...info.descriptionInformation.technicalFieldTextList]
      this.specification.backgroundArt.text = [...info.descriptionInformation.backgroundArtTextList]
      this.specification.disclosure.text = [...info.descriptionInformation.technicalFieldTextList]
      this.specification.descofPic.text = [...info.descriptionInformation.descriptionOfDrawingsTextList]
      this.specification.modeforInvention.text = [...info.descriptionInformation.modeForInventionTextList]
      // 法律状态
      this.legalTable = [...info.legalStatusList]
    },
    refreshSimPanel (similarities) {
      this.patentTable.splice(0, this.patentTable.length)
      this.patentTable = [...similarities]
      for (let patent of this.patentTable) {
        patent.inventorList = patent.inventorList.join(' ')
      }
    }
  },
  mounted () {
    let ids = {
      patentId: state.get('patentId')
    }
    sendRequest.patentInfo.get(null, ids).then(data => {
      this.fillInfo(data)
    })
  }
}
</script>

<style lang="scss">
  .info {
    flex-direction: column;
  }
  .info__title {

  }
  .tab {
    width: 70%;
    margin: 0 auto;
  }
  .table-row-title {
    width: 20%;
  }
  .para {
    text-align: left;
  }
  .specification {
    .specification-title {
      margin-bottom: 0;
      text-align: left;
    }
    .para {
      margin-top: 0;
    }
  }
</style>
