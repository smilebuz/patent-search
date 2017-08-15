<template lang="html">
  <div>
    <myHeader></myHeader>
    <searchbar></searchbar>
    <el-tabs type='border-card' class="tab" v-model='activeTab' @tab-click='switchTab'>
      <el-tab-pane v-for='tab, index in tabs' :key='index' v-bind:label='tab.message' v-bind:name='tab.value'>

        <el-table v-if='activeTab === "info"' :data='infoTable' border align='left'>
          <el-table-column prop='title' label='信息名称' class='table-row-title'></el-table-column>
          <el-table-column prop='text' label='信息内容'></el-table-column>
        </el-table>

        <p v-if='activeTab === "claimInfo"' v-for='claim, index in claimList' :key='index' class="para">{{ claim }}</p>

        <div v-if='activeTab === "specification"' class='specification'>
          <h4 class='specification-title'>{{ specification.technicalField.title }}</h4>
          <p v-for='item, index in specification.technicalField.text' :key='index' class='para'>{{ item }}</p>
          <h4 class='specification-title'>{{ specification.backgroundArt.title }}</h4>
          <p v-for='item, index in specification.backgroundArt.text' :key='index' class='para'>{{ item }}</p>
          <h4 class='specification-title'>{{ specification.disclosure.title }}</h4>
          <p v-for='item, index in specification.disclosure.text' :key='index' class='para'>{{ item }}</p>
          <h4 class='specification-title'>{{ specification.descofPic.title }}</h4>
          <p v-for='item, index in specification.descofPic.text' :key='index' class='para'>{{ item }}</p>
          <h4 class='specification-title'>{{ specification.modeforInvention.title }}</h4>
          <p v-for='item, index in specification.modeforInvention.text' :key='index' class='para'>{{ item }}</p>
        </div>

        <el-table v-if='activeTab === "legalStatus"' :data='legalTable' border>
          <el-table-column prop='date' label='年份'></el-table-column>
          <el-table-column prop='status' label='法律状态'></el-table-column>
          <el-table-column prop='countryCode' label='相关国家代码'></el-table-column>
          <el-table-column prop='patentNo' label='专利号'></el-table-column>
          <el-table-column prop='country' label='专利国家'></el-table-column>
        </el-table>

        <el-table v-if='activeTab === "similarPatent"' :data='patentTable' border align='center'>
          <el-table-column prop='applyType' label='专利类型'></el-table-column>
          <el-table-column prop='title' label='相似专利名称'></el-table-column>
          <el-table-column prop='applicant' label='申请人'></el-table-column>
          <el-table-column prop='inventor' label='发明人'></el-table-column>
          <el-table-column prop='ipcNo' label='分类号'></el-table-column>
          <el-table-column prop='productCategory' label='产品分类'></el-table-column>
          <el-table-column prop='nationalEconomyCategory' label='国民经济分类'></el-table-column>
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
        this.$http.get('/api/patents/06efc0c4-5d51-4c26-b505-05e2b4b9ce54/similarities', {
          params: {
            perPage: 5,
            page: 1
          }
        })
        .then((response) => {
          this.fillSimPanel(response.data.result)
        })
        .catch((error) => {
          console.log(error)
        })
      }
    },
    fillInfo (info) {
      let bibliographicInfo = info.bibliographicInformation

      let claimList = info.claimInformation.claimTextList

      let technicalList = info.descriptionInformation.technicalFieldTextList
      let backgroundList = info.descriptionInformation.backgroundArtTextList
      let disclosureList = info.descriptionInformation.disclosureTextList
      let descofPicList = info.descriptionInformation.descriptionOfDrawingsTextList
      let modeList = info.descriptionInformation.modeForInventionTextList

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
      // 权利要求
      for (let i = 0; i < claimList.length; i++) {
        this.claimList.push(claimList[i])
      }
      // 说明书
      for (var i = 0; i < technicalList.length; i++) {
        this.specification.technicalField.text.push(technicalList[i])
      }
      for (let i = 0; i < backgroundList.length; i++) {
        this.specification.backgroundArt.text.push(backgroundList[i])
      }
      for (let i = 0; i < disclosureList.length; i++) {
        this.specification.disclosure.text.push(disclosureList[i])
      }
      for (let i = 0; i < descofPicList.length; i++) {
        this.specification.descofPic.text.push(descofPicList[i])
      }
      for (let i = 0; i < modeList.length; i++) {
        this.specification.modeforInvention.text.push(modeList[i])
      }
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
    },
    fillSimPanel (similarities) {
      for (let i = 0; i < similarities.length; i++) {
        this.patentTable.push({
          applyType: similarities[i].applyType,
          title: similarities[i].inventionTitle,
          applicant: similarities[i].applicant,
          inventor: similarities[i].inventorList.join(' '),
          ipcNo: similarities[i].ipcClassificationNumber,
          productCategory: similarities[i].productCategory,
          nationalEconomyCategory: similarities[i].nationalEconomyCategory
        })
      }
    }
  },
  mounted () {
    this.$http.get('/api/patents/06efc0c4-5d51-4c26-b505-05e2b4b9ce54')
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
