<template lang="html">
  <div class="info">
    <div class="info__title">
      <img src="" alt="返回上一页" class="title__prev" @click="prev"></img>
      <span class="title__id">{{ patentId }}</span>
      <span class="title__name">{{ inventionTitle }}</span>
    </div>
    <el-tabs class="tab" type="border-card"
      v-model="activeTab"
      @tab-click="switchTab">
      <el-tab-pane
        v-for="(tab, index) in tabs"
        :key="index"
        :label="tab.message"
        :name="tab.value">

        <el-table v-if="activeTab === 'info'" :data="infoTable" border align="left">
          <el-table-column prop="title" label="信息名称" class="table-row-title"></el-table-column>
          <el-table-column prop="text" label="信息内容"></el-table-column>
        </el-table>

        <p class="para"
          v-if="activeTab === 'claimInfo'"
          v-for="(claim, index) in claimList"
          :key="index"
          >{{ claim }}
        </p>

        <div v-if="activeTab === 'specification'" class="specification">
          <h4 class="specification-title">{{ specification.technicalField.title }}</h4>
          <p class="para"
            v-for="item, index in specification.technicalField.text"
            :key="index"
            >{{ item }}
          </p>
          <h4 class="specification-title">{{ specification.backgroundArt.title }}</h4>
          <p class="para"
            v-for="item, index in specification.backgroundArt.text"
            :key="index"
            >{{ item }}
          </p>
          <h4 class="specification-title">{{ specification.disclosure.title }}</h4>
          <p class="para"
            v-for="item, index in specification.disclosure.text"
            :key="index"
            >{{ item }}
          </p>
          <h4 class="specification-title">{{ specification.descofPic.title }}</h4>
          <p class="para"
            v-for="item, index in specification.descofPic.text"
            :key="index"
            >{{ item }}
          </p>
          <h4 class="specification-title">{{ specification.modeforInvention.title }}</h4>
          <p class="para"
            v-for="item, index in specification.modeforInvention.text"
            :key="index"
          >{{ item }}
          </p>
        </div>

        <el-table v-if="activeTab === 'legalStatus'" :data="legalTable" border>
          <el-table-column prop="date" label="日期"></el-table-column>
          <el-table-column prop="status" label="法律状态"></el-table-column>
          <el-table-column prop="countryCode" label="相关国家代码"></el-table-column>
          <el-table-column prop="patentNo" label="专利号"></el-table-column>
          <el-table-column prop="country" label="专利国家"></el-table-column>
        </el-table>

        <div v-if="activeTab === 'pics'">
          <img v-for="url in imgUrls" :src="url" alt="附图"></img>
        </div>

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
// import { infoState } from '../state/patentInfo/state.js'
import { sendRequest } from '../Api'

export default {
  data () {
    return {
      activeTab: 'info',
      patentId: '',
      inventionTitle: '',
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
          message: '附图',
          value: 'pics'
        },
        {
          message: '相似专利',
          value: 'similarPatent'
        }
      ],
      infoTable: [
        {
          title: '专利名称',
          text: '',
          key: 'invention_title'
        },
        {
          title: '申请号',
          text: '',
          key: 'apply_no'
        },
        {
          title: '申请日',
          text: '',
          key: 'apply_date'
        },
        {
          title: '公开号',
          text: '',
          key: 'publish_no'
        },
        {
          title: '公开日',
          text: '',
          key: 'publish_date'
        },
        {
          title: '申请人',
          text: '',
          key: 'applicant_name'
        },
        {
          title: '申请人地址',
          text: '',
          key: 'applicant_address'
        },
        {
          title: '申请人邮编',
          text: '',
          key: 'applicant_post_code'
        },
        {
          title: '发明人',
          text: '',
          key: 'inventor_list'
        },
        {
          title: '代理人',
          text: '',
          key: 'agent_name'
        },
        {
          title: '代理机构',
          text: '',
          key: 'agency_name'
        },
        {
          title: '优先权号',
          text: '',
          key: 'priority_claim_doc_number'
        },
        {
          title: '优先权日',
          text: '',
          key: 'priority_claim_doc_date'
        },
        {
          title: '国际专利分类号',
          text: '',
          key: 'ipc_main_classification_no'
        },
        {
          title: '专利类型',
          text: '',
          key: 'apply_type'
        },
        {
          title: '专利文本页数',
          text: '',
          key: 'patent_page_number'
        },
        {
          title: '权利要求数量',
          text: '',
          key: 'claim_number'
        },
        {
          title: '摘要',
          text: '',
          key: 'abstract_info'
        }
      ],
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
      patentTable: [],
      imgUrls: []
    }
  },
  methods: {
    prev () {
      this.$router.push('/SearchResult')
    },
    switchTab (tab, event) {
      if (this.activeTab === 'legalStatus') {
        let ids = {
          patentId: this.patentId
        }
        sendRequest.legalStatus.get(null, ids).then(data => {
          this.legalTable = data
        })
      }
      if (this.activeTab === 'similarPatent') {
        let ids = {
          patentId: this.patentId
        }
        sendRequest.similarPatent.get(null, ids).then(data => {
          this.patentTable = data
          for (let patent of this.patentTable) {
            patent.inventorList = patent.inventorList.join(' ')
          }
        })
      }
    },
    fillInfo (info) {
      let bibliographicInfo = info.bibliographic_data
      this.inventionTitle = bibliographicInfo.invention_title
      // 著录项目信息
      for (let row of this.infoTable) {
        let key = row.key
        if (key === 'inventor_list') {
          row.text = bibliographicInfo[key].join(' ')
        } else {
          row.text = bibliographicInfo[key]
        }
      }
      // 权利要求
      this.claimList = info.detail_claim.text_list
      // 说明书
      this.specification.technicalField.text = info.detail_description.technical_field_text_list
      this.specification.backgroundArt.text = info.detail_description.background_art_text_list
      this.specification.disclosure.text = info.detail_description.disclosure_text_list
      this.specification.descofPic.text = info.detail_description.description_of_drawings_text_list
      this.specification.modeforInvention.text = info.detail_description.mode_for_invention_text_list
      // 附图
      this.imgUrls = info.detail_drawings.url_list
    }
  },
  created () {
    this.patentId = this.$route.params.patentId
    let ids = {
      patentId: this.patentId
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
    display: flex;
    height: 30px;
    line-height: 30px;
    .title__prev {
      cursor: pointer;
    }
    .title__id {
      padding: 0 5px;
      background: #f5f5f5;
    }
    .title__name {
      padding: 0 10px;
    }
  }
  .tab {
    width: 70%;
    margin: 10px auto;
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
