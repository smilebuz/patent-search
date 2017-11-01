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
            @click="switchTab(header.name, index)"
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
              :data="applicantTable">
              <el-table-column prop="title" label="信息名称" class="table-row-title"></el-table-column>
              <el-table-column prop="text" label="信息内容"></el-table-column>
            </el-table>
          </div>

          <div class="tab__content-container" v-else-if="currentTab === 'value'">
            <el-table class="tab__content-table"
              border
              aligh="left"
              :data="valueTable">
              <el-table-column prop="similarity_score" label="评估项"></el-table-column>
              <el-table-column prop="invention_title" label="得分值"></el-table-column>
              <el-table-column prop="publish_date" label="总分"></el-table-column>
            </el-table>
          </div>

          <div class="tab__content-container" v-else-if="currentTab === 'similarity'">
            <el-table class="tab__content-table"
              border
              aligh="left"
              :data="similarityTable">
              <el-table-column prop="similarity_score" label="相似度"></el-table-column>
              <el-table-column prop="invention_title" label="相似专利名称"></el-table-column>
              <el-table-column prop="publish_date" label="公开号"></el-table-column>
              <el-table-column prop="applicant_name" label="申请人"></el-table-column>
              <el-table-column prop="inventor_list" label="发明人"></el-table-column>
              <el-table-column prop="ipc_main_classification_no" label="分类号"></el-table-column>
              <el-table-column prop="product_classification_list" label="产品分类"></el-table-column>
              <el-table-column prop="neic_name_List" label="国民经济分类"></el-table-column>
            </el-table>
            <div class="pagination">
              <span class="pagination__info">总计{{  }}条记录</span>
              <el-pagination class="pagination__page"
                :page-size="10"
                :page-sizes="[10, 20, 30]"
                @size-change="changeSimilarityPageSize"
                @current-change="changeSimilarityPageNum"
                layout="total, sizes, prev, pager, next, jumper">
              </el-pagination>
            </div>
          </div>

          <div class="tab__content-container" v-else>
            <el-table class="tab__content-table"
              border
              align="left"
              :data="buyerTable">
              <el-table-column prop="applicant_name" label="买家名称"></el-table-column>
              <el-table-column prop="area" label="所在地"></el-table-column>
              <el-table-column prop="fount_year" label="成立时间"></el-table-column>
              <el-table-column prop="registration_capital" label="注册资金"></el-table-column>
              <el-table-column prop="annual_revenue" label="年营业额"></el-table-column>
              <el-table-column prop="owned_patents_number" label="拥有专利数"></el-table-column>
              <el-table-column prop="main_product_list" label="主营产品"></el-table-column>
            </el-table>
            <div class="pagination">
              <span class="pagination__info">总计{{  }}条记录</span>
              <el-pagination class="pagination__page"
                :page-size="10"
                :page-sizes="[10, 20, 30]"
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
      currentTab: 'applicant',
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
      similarityTable: [
      ],
      buyerTable: [],
      similarityParams: {
        per_page: 10,
        page: 1,
        invention_title: '设备和电子设备' // 去掉
      },
      buyerParams: {
        per_page: 10,
        page: 1
      }
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
    switchTab (tabName, targetIndex) {
      this.tabs.forEach((tab, index, arr) => {
        if (index === targetIndex) {
          tab.activate = true
        } else {
          tab.activate = false
        }
      })
      this.loadTabData(tabName)
    },
    loadTabData (infoType) {
      this.currentTab = infoType
      let ids = {}
      switch (infoType) {
        case 'applicant':
          ids = {
            applicantId: this.applicantId
          }
          sendRequest.applicant.get(null, ids).then(data => {
            debugger
            // 申请人信息
            for (let row of this.applicantTable) {
              let key = row.key
              row.text = data[key]
            }
          })
          break
        case 'value':
          break
        case 'similarity':
          ids = {
            patentId: this.patentId
          }
          sendRequest.similarPatent.get(this.similarityParams, ids).then(data => {
            debugger
            this.similarityTable = data
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
          })
          break
        case 'buyer':
          ids = {
            patentId: this.patentId
          }
          sendRequest.potentialBuyer.get(this.buyerParams, ids).then(data => {
            this.buyerTable = data
            for (let buyer of this.buyerTable) {
              buyer.main_product_list = buyer.main_product_list.join(';')
            }
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
    let infoType = this.$route.params.infoType
    this.applicantId = this.$route.params.applicantId
    this.patentId = this.$route.params.patentId
    this.loadTabData(infoType)
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
</style>
