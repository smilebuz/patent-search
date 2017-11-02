<template>
  <div class="relatedInfo">
    <div class="info__title">
      <img src="" alt="返回上一页" class="title__prev"></img>
      <span class="title__id">{{ patentId }}</span>
      <span class="title__name">{{ inventionTitle }}</span>
    </div>
    <div class="tabs">
      <div class="tabs__headers">
        <div class="tabs__headers-container">
          <div class="tabs__header-item"
            v-for="(header, index) in tabs"
            :key="header.name"
            :class="{ 'header-activate': header.activate}"
            @click="currentTab = header.name"
            >{{ header.label }}
          </div>
        </div>
        <div class="tabs__toolbuttons">
          <el-button class="toolbox button"
            v-for="(button, index) in buttons"
            :key="button.value"
            :style="buttonStyle(button.imgUrl)"
            @click="clickToolButton(button.value)">
            {{ button.name }}
          </el-button>
        </div>
      </div>
      <div class="tabs__body">
        <div class="body__sidePic"></div>
        <div class="body__content">

          <div class="tab__content-container" v-if="currentTab === 'applicant'">
            <el-table class="tab__content-table"
              border
              align="left"
              v-loading="loadingApplicantTable"
              :data="applicantTable"
              :key="tableKeys[0]">
              <el-table-column prop="title" label="信息名称" class="table-row-title"></el-table-column>
              <el-table-column prop="text" label="信息内容"></el-table-column>
            </el-table>
          </div>

          <div class="tab__content-container" v-if="currentTab === 'value'">
            <el-table class="tab__content-table"
              border
              aligh="left"
              :data="valueTable"
              :key="tableKeys[1]">
              <el-table-column prop="similarity_score" label="评估项"></el-table-column>
              <el-table-column prop="invention_title" label="得分值"></el-table-column>
              <el-table-column prop="publish_date" label="总分"></el-table-column>
            </el-table>
          </div>

          <div class="tab__content-container" v-if="currentTab === 'similarity'">
            <el-table class="tab__content-table"
              border
              aligh="left"
              v-loading="loadingSimilarityTable"
              :data="similarityTable"
              :key="tableKeys[2]">
              <el-table-column prop="similarity_score" label="相似度" width="70"></el-table-column>
              <el-table-column prop="invention_title" label="相似专利名称"></el-table-column>
              <el-table-column prop="publish_date" label="公开号" width="100"></el-table-column>
              <el-table-column prop="applicant_name" label="申请人"></el-table-column>
              <el-table-column prop="inventor_list" label="发明人"></el-table-column>
              <el-table-column prop="ipc_main_classification_no" label="分类号" width="100"></el-table-column>
              <el-table-column prop="product_classification_list" label="产品分类"></el-table-column>
              <el-table-column prop="neic_name_List" label="国民经济分类"></el-table-column>
            </el-table>
            <div class="pagination">
              <span class="pagination__info">总计{{ similarityPageInfo.total_item_number }}条记录</span>
              <el-pagination class="pagination__page"
                :key="pageKeys[0]"
                :page-size="similarityParams.per_page"
                :page-sizes="[10, 20, 30]"
                :current-page="similarityPageInfo.current_page"
                :page-count="similarityPageInfo.total_page_number"
                @size-change="changeSimilarityPageSize"
                @current-change="changeSimilarityPageNum"
                layout="total, sizes, prev, pager, next, jumper">
              </el-pagination>
            </div>
          </div>

          <div class="tab__content-container" v-if="currentTab === 'buyer'">
            <el-table class="tab__content-table"
              border
              align="left"
              v-loading="loadingBuyerTable"
              :data="buyerTable"
              :key="tableKeys[3]">
              <el-table-column prop="applicant_name" label="买家名称" width="230"></el-table-column>
              <el-table-column prop="area" label="所在地" width="75"></el-table-column>
              <el-table-column prop="fount_year" label="成立时间" width="100"></el-table-column>
              <el-table-column prop="registration_capital" label="注册资金" width="100"></el-table-column>
              <el-table-column prop="annual_revenue" label="年营业额" width="100"></el-table-column>
              <el-table-column prop="owned_patents_number" label="拥有专利数" width="95"></el-table-column>
              <el-table-column prop="main_product_list" label="主营产品"></el-table-column>
            </el-table>
            <div class="pagination">
              <span class="pagination__info">总计{{ buyerPageInfo.total_item_number }}条记录</span>
              <el-pagination class="pagination__page"
                :key="pageKeys[1]"
                :page-size="buyerParams.per_page"
                :page-sizes="[10, 20, 30]"
                :current-page="buyerPageInfo.current_page"
                :page-count="buyerPageInfo.total_page_number"
                @size-change="changeBuyerPageSize"
                @current-change="changeBuyerPageNum"
                layout="total, sizes, prev, pager, next, jumper">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sendRequest } from '../Api'

export default {
  data () {
    return {
      patentId: '1',
      inventionTitle: 'a',
      tabs: [
        {
          name: 'applicant',
          label: '申请人经营信息',
          activate: false
        },
        {
          name: 'value',
          label: '综合价值评估',
          activate: false
        },
        {
          name: 'similarity',
          label: '相似专利',
          activate: false
        },
        {
          name: 'buyer',
          label: '潜在买家',
          activate: false
        }
      ],
      buttons: [
        {
          name: '保存',
          value: 'save',
          imgUrl: require('../assets/images/save.png')
        },
        {
          name: '加入收藏',
          value: 'favor',
          imgUrl: require('../assets/images/favor.png')
        },
        {
          name: '加入分析库',
          value: '',
          imgUrl: require('../assets/images/analysis.png')
        }
      ],
      currentTab: '',
      loadingApplicantTable: false,
      applicantTable: [
        {
          title: '申请人名称',
          text: '',
          key: 'name'
        },
        {
          title: '注册号',
          text: '',
          key: 'registration_number'
        },
        {
          title: '社会信用代码',
          text: '',
          key: 'social_credit_code'
        },
        {
          title: '组织机构代码',
          text: '',
          key: 'organization_code'
        },
        {
          title: '公司法人',
          text: '',
          key: 'legal_person'
        },
        {
          title: '成立日期',
          text: '',
          key: 'establishment_date'
        },
        {
          title: '注册资本',
          text: '',
          key: 'registered_capital'
        },
        {
          title: '一般经营范围',
          text: '',
          key: 'general_business_scope'
        },
        {
          title: '企业类型',
          text: '',
          key: 'enterprise_type'
        },
        {
          title: '股东信息',
          text: '',
          key: 'shareholder_information'
        },
        {
          title: '主要成员',
          text: '',
          key: 'main_members_info'
        },
        {
          title: '电话',
          text: '',
          key: 'main_members_info'
        },
        {
          title: '最新年报电话',
          text: '',
          key: 'phone_number_info'
        },
        {
          title: '邮箱',
          text: '',
          key: 'email'
        },
        {
          title: '地址',
          text: '',
          key: 'address'
        },
        {
          title: '网址',
          text: '',
          key: 'website'
        },
        {
          title: '行业大类',
          text: '',
          key: 'industry_big_category'
        },
        {
          title: '行业小类',
          text: '',
          key: 'industry_small_category'
        },
        {
          title: '分支机构',
          text: '',
          key: 'branch'
        },
        {
          title: '状态',
          text: '',
          key: 'management_status'
        },
        {
          title: '历史名称',
          text: '',
          key: 'history_name'
        },
        {
          title: '省份',
          text: '',
          key: 'province'
        },
        {
          title: '城市',
          text: '',
          key: 'city'
        },
        {
          title: '地区',
          text: '',
          key: 'district'
        },
        {
          title: '营业期限',
          text: '',
          key: 'business_term'
        },
        {
          title: '发照日期',
          text: '',
          key: 'issue_date'
        },
        {
          title: '登记机关',
          text: '',
          key: 'registration_authority'
        },
        {
          title: '变更记录',
          text: '',
          key: 'change_record'
        },
        {
          title: '主营产品',
          text: '',
          key: ''
        }
      ],
      valueTable: [],
      loadingSimilarityTable: false,
      similarityTable: [],
      similarityPageInfo: {
        current_page: -1,
        total_page_number: -1,
        total_item_number: -1
      },
      loadingBuyerTable: false,
      buyerTable: [],
      buyerPageInfo: {
        current_page: -1,
        total_page_number: -1,
        total_item_number: -1
      },
      similarityParams: {
        per_page: 10,
        page: 1
      },
      buyerParams: {
        per_page: 10,
        page: 1
      },
      pageKeys: ['similarityPage', 'buyerPage'],
      tableKeys: ['applicantTable', 'valueTable', 'similarityTable', 'buyerTable']
    }
  },
  watch: {
    similarityParams: {
      handler: function (newParams) {
        this.loadTabData('similarity')
      },
      deep: true
    },
    buyerParams: {
      handler: function (newParams) {
        this.loadTabData('buyer')
      },
      deep: true
    },
    currentTab: function (tabName) {
      this.tabs.forEach((tab, index, arr) => {
        if (tabName === tab.name) {
          tab.activate = true
        } else {
          tab.activate = false
        }
      })
      this.loadTabData(tabName)
    }
  },
  methods: {
    buttonStyle (imgUrl) {
      return {
        background: 'url(' + imgUrl + ') no-repeat 5px center #fff',
        paddingLeft: '25px',
        paddingRight: '5px'
      }
    },
    loadTabData (tabName) {
      let ids = {}
      switch (tabName) {
        case 'applicant':
          ids = {
            applicantId: this.applicantId
          }
          this.loadingApplicantTable = true
          sendRequest.applicant.get(null, ids).then(data => {
            for (let row of this.applicantTable) {
              let key = row.key
              row.text = data[key]
            }
            this.loadingApplicantTable = false
          })
          break
        case 'value':
          break
        case 'similarity':
          ids = {
            patentId: this.patentId
          }
          this.loadingSimilarityTable = true
          sendRequest.similarPatent.get(this.similarityParams, ids).then(data => {
            this.similarityTable = data.similarity_patent_list
            for (let patent of this.similarityTable) {
              let tempClassificationList = ''
              patent.similarity_score = parseFloat((patent.similarity_score * 100).toFixed(2)) + '%'
              patent.inventor_list = patent.inventor_list.join(' ')
              patent.neic_name_List = patent.neic_name_List.join(' ')
              patent.product_classification_list.forEach((el, index, arr) => {
                tempClassificationList += el.product_type + ' '
              })
              patent.product_classification_list = tempClassificationList
            }
            for (let prop in this.similarityPageInfo) {
              if (this.similarityPageInfo.hasOwnProperty(prop)) {
                this.similarityPageInfo[prop] = data[prop]
              }
            }
            this.loadingSimilarityTable = false
          })
          break
        case 'buyer':
          ids = {
            patentId: this.patentId
          }
          this.loadingBuyerTable = true
          sendRequest.potentialBuyer.get(this.buyerParams, ids).then(data => {
            this.buyerTable = data.current_page_item_list
            for (let buyer of this.buyerTable) {
              buyer.main_product_list = buyer.main_product_list.join(';')
            }
            for (let prop in this.buyerPageInfo) {
              if (this.buyerPageInfo.hasOwnProperty(prop)) {
                this.buyerPageInfo[prop] = data[prop]
              }
            }
            this.loadingBuyerTable = false
          })
          break
        default:
          break
      }
    },
    changeSimilarityPageSize (pageSize) {
      this.similarityParams.per_page = pageSize
    },
    changeSimilarityPageNum (pageNum) {
      this.similarityParams.page = pageNum
    },
    changeBuyerPageSize (pageSize) {
      this.buyerParams.per_page = pageSize
    },
    changeBuyerPageNum (pageNum) {
      this.buyerParams.page = pageNum
    }
  },
  created () {
    this.applicantId = this.$route.params.applicantId
    this.patentId = this.$route.params.patentId
    this.currentTab = this.$route.params.infoType
  }
}
</script>

<style lang="scss">
  .relatedInfo {
    flex-direction: column;
  }
  .tabs {
    padding-top: 20px;
  }
  .tabs__headers {
    display: flex;
    justify-content: space-between;
    padding-left: 40px;
    padding-right: 40px;
    border-bottom: 2px solid #1ab0e6;
    font-size: 14px;
  }
  .tabs__headers-container {
    display: flex;
    .tabs__header-item {
      height: 35px;
      line-height: 35px;
      padding-left: 10px;
      padding-right: 10px;
      margin-right: 5px;
      background: #eee;
      color: #000;
      cursor: pointer;
      &:hover {
        background: #1ab0e6;
        color: #fff;
      }
    }
    .header-activate {
      background: #1ab0e6;
      color: #fff;
    }
  }
  .tabs__body {
    display: flex;
  }
  .body__sidePic {
    flex-basis: 170px;
    background: #f4f4f4;
  }
  .body__content {
    flex: 1;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .tab__content-container {
    width: 90%;
    margin: 0 auto;
  }
  .pagination {
    padding: 10px 0;
  }
</style>