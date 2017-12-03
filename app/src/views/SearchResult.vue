<template>
  <div class="searchResult"
    v-loading="loadingData"
    element-loading-text="加载中">
    <SideMenu></SideMenu>
    <div class="resultPanel">
      <div class="toolbar">
        <el-button-group class="toolbox">
          <el-button class="button" @click="switchDisplayType('list')">
            <img src="../assets/images/list.png" alt="列表式"></img>
          </el-button>
          <el-button class="button" @click="switchDisplayType('table')">
            <img src="../assets/images/table.png" alt="表格式"></img>
          </el-button>
        </el-button-group>
        <el-select class="sortSelection toolbox"
          size="small"
          v-model="sortSelected"
          @change="submitSortParams">
          <el-option
            v-for="(option, index) in sortOptions"
            :key="index"
            :label="option.label"
            :value="index">
            <img :src="option.imgUrl" alt="排序方向">
            <span>{{ option.label }}</span>
          </el-option>
        </el-select>
        <el-button class="toolbox button toolbox-button"
          v-for="(button, index) in buttons"
          :key="index"
          :style="buttonStyle(button.imgUrl)"
          @click="clickToolButton(button.value)">
          {{ button.name }}
        </el-button>
        <el-popover
          border
          v-model="favorPopover"
          placement="bottom"
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
      <div class="listPanel">
        <div class="selectAll" v-show="displayType === 'list'">
          <el-checkbox
            :value="selectedPatentIds.length === 10"
            @change="changeSelectAllCb">全选
          </el-checkbox>
        </div>
        <div class="patentList"
          v-loading="loadingPatentList"
          element-loading-text="加载中"
          v-show="displayType === 'list'">
          <div class="patent"
            v-for="(patent, index) in patentList"
            :key="index">
            <el-checkbox
              :value="patent.selected"
              @change="selectSinglePatent(patent.selected, index)">
            </el-checkbox>
            <img :src="patent.src" class="thumbnail"></img>
            <div class="patentInfo">
              <div class="patentInfo__header">
                <span class="header__title"
                  @click="checkPatentInfo('info', patent.patent_id)"
                  >{{ patent.invention_title }}
                </span>
                <div class="header__tags">
                  <el-tag class="header__tag">存活期: {{ patent.maintenance_period }}年 </el-tag>
                  <!-- <el-tag class="header__tag header__tag-value"
                    >价值度: {{ patent.value_degree.value }}
                    <div class="header__tag-value-full">
                      <img
                      src="../assets/images/star-full.png"
                      alt="full star"
                      v-for="n in 5"
                      :key="n">
                    </div>
                    <div class="header__tag-value-blank">
                      <img
                        src="../assets/images/star-blank.png"
                        alt="blank star"
                        v-for="n in 5"
                        :key="n">
                    </div>
                  </el-tag> -->
                  <el-tag class="header__tag header__tag-value"
                    @click.native="checkRelatedInfo('value', patent)"
                    >价值度: {{ patent.value_degree.value }}
                    <img
                      src="../assets/images/star-full.png"
                      alt="full star"
                      v-for="n in patent.fullStarNum">
                    <img
                      src="../assets/images/star-half.png"
                      alt="half star"
                      v-if="patent.value_degree.value % 2">
                    <img
                      src="../assets/images/star-blank.png"
                      alt="blank star"
                      v-for="n in patent.blankStarNum">
                  </el-tag>
                  <el-tag class="header__tag" v-if="patent.award">{{ patent.award }}</el-tag>
                </div>
              </div>
              <div class="patentInfo__info">
                <div class="info__item">申请人:  
                  <span class="info__link info__link-light"
                    @click="changeSearchParams('applicant', patent.applicant_name)">{{ patent.applicant_name }}
                  </span>
                </div>
                <div class="info__item">发明人:
                  <span class="info__link"
                    v-for="(inventor, index) in patent.inventor_list"
                    :key="index"
                    @click="changeSearchParams('inventor', inventor)"
                    >{{ inventor }}
                  </span>
                </div>
                <div class="info__item">IPC分类号:
                  <span class="info__link"
                    @click="changeSearchParams('ipc_main_classification_no', patent.ipc_main_classification_no)"
                    >{{ patent.ipc_main_classification_no }}</span>
                </div>
              </div>
              <div class="patentInfo__info">
                <div class="info__item">申请日: <span>{{ patent.apply_date }}</span></div>
                <div class="info__item">申请号: <span>{{ patent.apply_no }}</span></div>
                <div class="info__item">公开日: <span>{{ patent.publish_date }}</span></div>
                <div class="info__item">公开号: <span>{{ patent.publish_no }}</span></div>
              </div>
              <div class="patentInfo__abstract patentInfo__abstract-collapse"
                v-if="patent.abstractExpand === '1'">
                摘要: {{ patent.abstract_info.substr(0,140) }}
                <span class="abstract__button"
                  @click="expandAbstract(index)">更多
                </span>
              </div>
              <div class="patentInfo__abstract patentInfo__abstract-expand"
                v-if="patent.abstractExpand === '2'">
                摘要: {{ patent.abstract_info }}
                <span class="abstract__button"
                  @click="collapseAbstract(index)">收起
                </span>
              </div>
              <div class="patentInfo__abstract patentInfo__abstract-collapse"
                v-if="patent.abstractExpand === '3'">
                摘要: {{ patent.abstract_info }}
              </div>
              <div class="patentInfo__links">
                <span class="info__link"
                  v-if="patent.applicant_id"
                  @click="checkRelatedInfo('applicant', patent)">申请人经营信息
                </span>
                <span class="info__link" @click="checkRelatedInfo('similarity', patent)">相似专利</span>
                <span class="info__link" @click="checkRelatedInfo('buyer', patent)">潜在买家</span>
              </div>
            </div>
          </div>
        </div>
        <div class="listTable" v-show="displayType === 'table'">
          <el-table
            border
            align="left"
            ref="patentTable"
            :data="patentList"
            key="patentTable"
            @selection-change="tableSelectionChange">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="apply_type" label="专利类型" width="80"></el-table-column>
            <el-table-column prop="publish_no" label="公开号" width="100"></el-table-column>
            <el-table-column prop="invention_title" label="专利名称"></el-table-column>
            <el-table-column prop="applicant_name" label="专利权人" width="165"></el-table-column>
            <el-table-column label="发明人" width="180">
              <template slot-scope="scope">
                <span
                  v-for="(inventor, index) in scope.row.inventor_list"
                  :key="index"
                  >{{ inventor }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="apply_date" label="申请日" width="100"></el-table-column>
            <el-table-column prop="publish_date" label="公开日" width="100"></el-table-column>
          </el-table>
        </div>
        <div class="pagination" v-if="patentList.length">
          <span class="pagination__info">搜索结果: {{ pageInfo.total_hits }}条 搜索时间: 约{{ pageInfo.took }}ms</span>
          <el-pagination class="pagination__page"
            :page-size="10"
            :page-sizes="[10, 20, 30]"
            :current-page="pageInfo.current_page"
            :page-count="pageInfo.total_page_number"
            @size-change="changePageSize"
            @current-change="changePageNum"
            layout="total, sizes, prev, pager, next, jumper">
          </el-pagination>
        </div>
      </div>
      <div class="recommendPanel">
        <span class="panel__title">相关推荐</span>
        <div class="recommend__category" v-if="recommendList.keyword_list.length">
          <span class="recommend__category-name">关键词</span>
          <div class="recommend__category-tags">
            <el-tag class="recommend__category-tag"
              type="primary"
              v-for="(keyword, index) in recommendList.keyword_list"
              :key="index"
              @click.native="changeSearchParams('keywords', keyword)"
              >{{ keyword }}
            </el-tag>
          </div>
        </div>
        <div class="recommend__category" v-if="recommendList.ipc_main_classification_list.length">
          <span class="recommend__category-name">IPC</span>
          <div class="recommend__category-tags">
            <el-tag class="recommend__category-tag"
              type="primary"
              v-for="(ipc, index) in recommendList.ipc_main_classification_list"
              :key="index"
              @click.native="changeSearchParams('ipc_main_classification_no', ipc)"
              >{{ ipc }}
            </el-tag>
          </div>
        </div>
        <div class="recommend__category" v-if="recommendList.applicant_list.length">
          <span class="recommend__category-name">申请人</span>
          <div class="recommend__category-tags">
            <el-tag class="recommend__category-tag"
              type="primary"
              v-for="(applicant, index) in recommendList.applicant_list"
              :key="index"
              @click.native="changeSearchParams('applicant', applicant)"
              >{{ applicant }}
            </el-tag>
          </div>
        </div>
        <div class="recommend__category" v-if="recommendList.product_list.length">
          <span class="recommend__category-name">产品</span>
          <div class="recommend__category-tags">
            <el-tag class="recommend__category-tag"
              type="primary"
              v-for="(product, index) in recommendList.product_list"
              :key="index"
              @click.native="changeSearchParams('keywords', product)"
              >{{ product }}
            </el-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideMenu from '../components/SideMenu'
import SearchList from '../components/SearchList'

// import bus from '../bus.js'
import { sendRequest } from '../Api'
import state from '../state/searchResult/state.js'
import bus from '../bus.js'

require('../assets/scss/result.scss')

export default {
  data () {
    return {
      sortSelected: '',
      sortOptions: [
        {
          imgUrl: require('../assets/images/down.png'),
          label: '相关度(降序)',
          value: 'relevance',
          direction: 'descending'
        },
        {
          imgUrl: require('../assets/images/top.png'),
          label: '相关度(升序)',
          value: 'relevance',
          direction: 'ascending'
        },
        {
          imgUrl: require('../assets/images/down.png'),
          label: '申请时间(降序)',
          value: 'apply_date',
          direction: 'descending'
        },
        {
          imgUrl: require('../assets/images/top.png'),
          label: '申请时间(升序)',
          value: 'apply_date',
          direction: 'ascending'
        },
        {
          imgUrl: require('../assets/images/down.png'),
          label: '价值度(降序)',
          value: 'value_degree',
          direction: 'descending'
        },
        {
          imgUrl: require('../assets/images/top.png'),
          label: '价值度(升序)',
          value: 'value_degree',
          direction: 'ascending'
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
      selectAll: false,
      displayType: 'list',
      sortParams: {
        target: '',
        direction: '',
        per_page: '',
        page: ''
      },
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
      },
      selectedPatentIds: []
    }
  },
  computed: {
    patentList: function () {
      return state.get('patentList')
    },
    recommendList: function () {
      return state.get('recommendList')
    },
    pageInfo: function () {
      return state.get('pageInfo')
    },
    loadingPatentList: function () {
      return state.get('loadingPatentList')
    },
    loadingData: function () {
      return state.get('loadingData')
    },
    abstractLength: function () {
      let container = document.querySelector('.patentInfo__abstract')
      let containerWidth = container.clientWidth
      let textSize = parseInt(getComputedStyle(container, null).fontSize)
      let textCount = containerWidth / textSize
      return parseInt(textCount * 1.8)
    }
  },
  created () {
    bus.$on('updateSearchParams', (query) => {
      if (!query) {
        // 为空
        this.sortSelected = 2
      } else {
        // 有输入
        this.sortSelected = 0
      }
    })
  },
  methods: {
    buttonStyle (imgUrl) {
      return {
        background: 'url(' + imgUrl + ') no-repeat 5px center #fff'
      }
    },
    switchDisplayType (type) {
      if (this.displayType !== type) {
        this.displayType = type
        if (type === 'table') {
          let rows = []
          this.patentList.forEach(patent => {
            if (patent.selected) {
              rows.push(patent)
            }
          })
          this.$refs.patentTable.clearSelection()
          this.tableSelectionChange(rows)
          // for (let id of this.selectedPatentIds) {
          //   let patent = this.patentList.find(el => {
          //     return el.patent_id === id
          //   })
          //   this.$refs.patentTable.toggleRowSelection(patent, true)
          // }
        }
      }
    },
    clickToolButton (command) {
      switch (command) {
        case 'save':
          console.log(this.selectedPatentIds)
          break
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
    changeSelectAllCb (flag) {
      if (flag) {
        // 全选
        this.selectedPatentIds = []
        for (let patent of this.patentList) {
          this.selectedPatentIds.push(patent.patent_id)
        }
        this.patentList.forEach((patent, index, arr) => {
          patent.selected = true
          state.updatePatentList(index, patent)
        })
      } else {
        // 取消全选
        this.selectedPatentIds = []
        this.patentList.forEach((patent, index, arr) => {
          patent.selected = false
          state.updatePatentList(index, patent)
        })
      }
      console.log(this.selectedPatentIds.length)
    },
    selectSinglePatent (flag, index) {
      let targetFlag = !flag
      let patent = this.patentList[index]
      patent.selected = targetFlag
      state.updatePatentList(index, patent)
      // 重新填充selectedPatentIds
      this.selectedPatentIds = []
      for (let patent of this.patentList) {
        if (patent.selected) {
          this.selectedPatentIds.push(patent.patent_id)
        }
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
      this.createFavorParams.patent_id_list = this.selectedPatentIds
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
      if (this.selectedPatentIds.length === 0) {
        this.$message({
          message: '请勾选要收藏的专利',
          type: 'warning'
        })
        return false
      }
      sendRequest.addFavors.put(this.selectedPatentIds, ids).then(data => {
        this.$message({
          message: '收藏成功',
          type: 'success'
        })
      })
    },
    tableSelectionChange (rows) {
      this.selectedPatentIds = []
      this.patentList.forEach((patent, index, arr) => {
        patent.selected = false
        state.updatePatentList(index, patent)
      })
      // 重新填充
      for (let patent of rows) {
        this.selectedPatentIds.push(patent.patent_id)
        let index = this.patentList.findIndex(el => {
          return el.patent_id === patent.patent_id
        })
        let targetPatent = this.patentList[index]
        targetPatent.selected = true
        state.updatePatentList(index, targetPatent)
        this.$refs.patentTable.toggleRowSelection(patent, true)
      }
    },
    submitSortParams (targetIndex) {
      if (typeof targetIndex === 'number') {
        state.setSortParams('target', this.sortOptions[targetIndex].value)
        state.setSortParams('direction', this.sortOptions[targetIndex].direction)
        state.setSortParams('per_page', state.get('searchParams').per_page)
        state.setSortParams('page', state.get('searchParams').page)
      } else {
        // 清空
        state.setSortParams('target', this.sortOptions[0].value)
      }
    },
    checkPatentInfo (infoType, patentId) {
      this.$router.push('/PatentInfo/' + infoType + '/' + patentId)
    },
    checkRelatedInfo (infoType, patent) {
      this.$router.push('/RelatedInfo/' + infoType + '/' + patent.patent_id + '/' + patent.applicant_id)
      // this.$router.push('/RelatedInfo/' + infoType + '/' + patent.patent_id + '/778929080')
    },
    expandAbstract (index) {
      let patent = this.patentList[index]
      patent.abstractExpand = '2'
      state.updatePatentList(index, patent)
    },
    collapseAbstract (index) {
      let patent = this.patentList[index]
      patent.abstractExpand = '1'
      state.updatePatentList(index, patent)
    },
    changeSearchParams (field, query) {
      document.documentElement.scrollTop = 0
      state.setSearchParams('field', field)
      state.setSearchParams('query', query)
      state.setSearchParams('search_mode', 'user_click')
      this.selectedPatentIds = []
    },
    changePageSize (pageSize) {
      state.setSearchParams('per_page', pageSize)
      state.setSearchParams('search_mode', 'user_click')
      this.selectedPatentIds = []
    },
    changePageNum (pageNum) {
      state.setSearchParams('page', pageNum)
      state.setSearchParams('search_mode', 'user_click')
      this.selectedPatentIds = []
    }
  },
  components: {
    SideMenu, SearchList
  }
}
</script>

<style lang="scss">
</style>
