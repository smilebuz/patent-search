<template lang="html">
  <div class="info">
    <div class="info__title">
      <img src="../assets/images/back.png" alt="返回上一页" class="title__prev" @click="prev"></img>
      <div class="title__id">{{ patentId }}</div>
      <div class="title__name">{{ inventionTitle }}</div>
    </div>
    <div class="tabs">
      <div class="tabs__headers">
        <div class="tabs__headers-container">
          <div class="tabs__header-item"
            v-for="(header, index) in tabs"
            :key="index"
            :class="{ 'header-activate': header.activate}"
            @click="currentTab = header.name"
            >{{ header.label }}
          </div>
        </div>
        <div class="tabs__toolbuttons">
          <el-button class="toolbox button toolbox-button"
            v-for="(button, index) in buttons"
            :key="index"
            :style="buttonStyle(button.imgUrl)"
            @click="clickToolButton(button.value)">
            {{ button.name }}
          </el-button>
          <el-popover
            class="popover"
            border
            v-model="favorPopover"
            placement="left"
            width="400"
            trigger="click">
            <div class="popover-header">
              <div>收藏夹名称:</div>
              <el-input class="popover-header__input"
                size="small"
                v-model="createFavorParams.name">
              </el-input>
              <el-button class="button" @click="submitCreateFavorParams">创建并加入</el-button>
              <i class="el-icon-close" @click="closeFavorPopover"></i>
            </div>
            <el-table
              key="favorTable"
              :data="favorTable"
              width="100%">
              <el-table-column label="收藏夹" prop="name"></el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button @click="addFavor(scope.row)" size="small">收藏</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination popover-pagination">
              <el-pagination
                small
                layout="prev, next"
                :page-count="favorPageInfo.total_page_number"
                :current-page="favorPageInfo.current_page"
                @current-change="changeFavorPageNum">
              </el-pagination>
            </div>
          </el-popover>
        </div>
      </div>
      <div class="tabs__body">
        <div class="body__sidePic"></div>
        <div class="body__content">

          <div class="tab__content-container" v-if="currentTab === 'info'">
            <el-table class="tab__content-table"
              border
              align="left"
              v-if="currentTab === 'info'"
              v-loading="loadingInfoTable"
              element-loading-text="加载中"
              :data="infoTable"
              :key="tableKeys[0]">
              <el-table-column prop="title" label="信息名称" class="table-row-title"></el-table-column>
              <el-table-column prop="text" label="信息内容"></el-table-column>
            </el-table>
          </div>

          <div class="tab__content-container" v-if="currentTab === 'claim'">
            <p class="para"
              v-if="currentTab === 'claim'"
              v-for="(claim, index) in claimList"
              >{{ claim }}
            </p>
          </div>

          <div class="tab__content-container" v-if="currentTab === 'description'">
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

          <div class="tab__content-container" v-if="currentTab === 'legal'">
            <el-table class="tab__content-table"
              border
              align="left"
              v-loading="loadingLegalTable"
              element-loading-text="加载中"
              :data="legalTable"
              :key="tableKeys[3]">
              <el-table-column prop="date" label="日期"></el-table-column>
              <el-table-column prop="status" label="法律状态"></el-table-column>
              <el-table-column prop="countryCode" label="相关国家代码"></el-table-column>
              <el-table-column prop="patentNo" label="专利号"></el-table-column>
              <el-table-column prop="country" label="专利国家"></el-table-column>
            </el-table>
          </div>

          <div class="tab__content-container" v-if="currentTab === 'picture'">
            <template v-if="imgUrls.length">
              <img v-for="url in imgUrls"
                :src="url"
                alt="附图"
                class="attached-img">
              </img>
            </template>
            <p v-else>很遗憾 当前专利没有附图信息</p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { infoState } from '../state/patentInfo/state.js'
import { sendRequest } from '../Api'

require('../assets/scss/patent-info.scss')

export default {
  data () {
    return {
      currentTab: '',
      patentId: '',
      inventionTitle: '',
      tabs: [
        {
          name: 'info',
          label: '著录项目信息',
          activate: false
        },
        {
          name: 'claim',
          label: '权利要求',
          activate: false
        },
        {
          name: 'description',
          label: '说明书',
          activate: false
        },
        {
          name: 'legal',
          label: '法律状态',
          activate: false
        },
        {
          name: 'picture',
          label: '附图',
          activate: false
        }
      ],
      buttons: [
        // {
        //   name: '保存',
        //   value: 'save',
        //   imgUrl: require('../assets/images/save.png')
        // },
        {
          name: '加入收藏',
          value: 'favor',
          imgUrl: require('../assets/images/favor.png')
        }
        // {
        //   name: '加入分析库',
        //   value: '',
        //   imgUrl: require('../assets/images/analysis.png')
        // }
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
      imgUrls: [],
      tableKeys: ['infoTable', 'claimTable', 'desTable', 'legalTable', 'picTable'],
      loadingInfoTable: false,
      loadingLegalTable: false,

      favorPopover: false,
      getFavorParams: {
        per_page: 5,
        page: 1
      },
      createFavorParams: {
        name: '',
        patent_id_list: []
      },
      favorTable: [],
      favorPageInfo: {
        current_page: 1,
        total_page_number: 1,
        current_page_item_number: 2,
        total_item_number: 2
      }
    }
  },
  watch: {
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
    prev () {
      // this.$router.push('/SearchResult')
      this.$router.go(-1)
    },
    buttonStyle (imgUrl) {
      return {
        background: 'url(' + imgUrl + ') no-repeat 5px center #fff',
        paddingLeft: '25px',
        paddingRight: '5px'
      }
    },

    clickToolButton (command) {
      switch (command) {
        case 'favor':
          sendRequest.getAllFavor.get(this.getFavorParams).then(data => {
            // debugger
            this.favorTable = data.favorite_list
            for (let prop in this.favorPageInfo) {
              if (this.favorPageInfo.hasOwnProperty(prop)) {
                this.favorPageInfo[prop] = data[prop]
              }
            }
            this.favorPopover = true
          })
          break
        default:
          break
      }
    },
    // 收藏弹框
    closeFavorPopover () {
      this.favorPopover = false
    },
    changeFavorPageNum (pageNum) {
      this.getFavorParams.page = pageNum
      sendRequest.getAllFavor.get(this.getFavorParams).then(data => {
        this.favorTable = data.favor_list
      })
    },
    submitCreateFavorParams () {
      this.createFavorParams.patent_id_list.push(this.patentId)
      console.log(this.createFavorParams)
      // debugger
      sendRequest.createFavor.post(this.createFavorParams).then(data => {
        this.$message({
          message: '创建目录并收藏成功',
          type: 'success'
        })
        sendRequest.getAllFavor.get(this.getFavorParams).then(data => {
          this.favorTable = data.favorite_list
          for (let prop in this.favorPageInfo) {
            if (this.favorPageInfo.hasOwnProperty(prop)) {
              this.favorPageInfo[prop] = data[prop]
            }
          }
        })
      })
    },
    addFavor (favor) {
      let ids = {
        favorId: favor.id
      }
      let patentIds = []
      patentIds.push(this.patentId)
      sendRequest.addFavors.put(patentIds, ids).then(data => {
        this.$message({
          message: '收藏成功',
          type: 'success'
        })
      })
    },

    loadTabData (tabName) {
      let ids = {}
      switch (tabName) {
        case 'info':
          ids = {
            patentId: this.patentId
          }
          this.loadingInfoTable = true
          sendRequest.patentInfo.get(null, ids).then(data => {
            this.fillInfo(data)
            this.loadingInfoTable = false
          })
          break
        case 'value':
          break
        case 'legal':
          ids = {
            patentId: this.patentId
          }
          this.loadingLegalTable = true
          sendRequest.legalStatus.get(null, ids).then(data => {
            this.legalTable = data
            this.loadingLegalTable = false
          })
          break
        default:
          break
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
    this.currentTab = this.$route.params.infoType
  }
}
</script>

<style lang="scss">
</style>
