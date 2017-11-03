<template>
  <div class="searchResult" v-loading="loadingData">
    <SideMenu></SideMenu>
    <div class="resultPanel">
      <div class="toolbar">
        <el-button-group class="toolbox">
          <el-button class="button" @click="displayType = 'list'">
            <img src="../assets/images/list.png" alt="列表式"></img>
          </el-button>
          <el-button class="button" @click="displayType = 'table'">
            <img src="../assets/images/table.png" alt="表格式"></img>
          </el-button>
        </el-button-group>
        <el-select class="sortSelection toolbox"
          size="small"
          clearable
          v-model="sortSelected"
          @change="submitSortParams">
          <el-option
            v-for="(option, index) in sortOptions"
            :key="option.label"
            :label="option.label"
            :value="index">
            <img :src="option.imgUrl" alt="排序方向">
            <span>{{ option.label }}</span>
          </el-option>
        </el-select>
        <el-button class="toolbox button"
          v-for="(button, index) in buttons"
          :key="button.value"
          :style="buttonStyle(button.imgUrl)"
          @click="clickToolButton(button.value)">
          {{ button.name }}
        </el-button>
      </div>
      <div class="listPanel">
        <div class="selectAll" v-if="displayType === 'list'">
          <el-checkbox v-model="selectAll">全选</el-checkbox>
        </div>
        <div class="patentList"
          v-loading="loadingPatentList"
          v-if="displayType === 'list'">
          <div class="patent"
            v-for="(patent, index) in patentList"
            :key="patent.patent_id">
            <el-checkbox v-model="patent.selected"></el-checkbox>
            <img :src="patent.src" class="thumbnail"></img>
            <div class="patentInfo">
              <div class="patentInfo__header">
                <span class="header__title"
                  @click="checkPatentInfo(patent.patent_id)"
                  >{{ patent.invention_title }}
                </span>
                <div class="header__tags">
                  <el-tag class="header__tag">存活期: {{ patent.maintenance_period }}年 </el-tag>
                  <el-tag class="header__tag header__tag-value">价值度: {{ patent.value_degree.value }}</el-tag>
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
                    :key="inventor"
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
              <div class="patentInfo__abstract"
                :class="{ 'patentInfo__abstract-collapse': !patent.abstractExpand }"
                v-if="!patent.abstractExpand">
                摘要: {{ patent.abstract_info.substr(0,140) }}
                <span class="abstract__button"
                  @click="expandAbstract(patent)">更多
                </span>
              </div>
              <div class="patentInfo__abstract" v-if="patent.abstractExpand">
                摘要: {{ patent.abstract_info }}
              </div>
              <div class="patentInfo__links">
                <span class="info__link" @click="checkRelatedInfo('applicant', patent)">申请人经营信息</span>
                <span class="info__link" @click="checkRelatedInfo('similarity', patent)">相似专利</span>
                <span class="info__link" @click="checkRelatedInfo('buyer', patent)">潜在买家</span>
              </div>
            </div>
          </div>
        </div>
        <div class="listTable" v-if="displayType === 'table'">
          <el-table
            border
            align="left"
            :data="patentList"
            key="patentTable">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="apply_type" label="专利类型" width="80"></el-table-column>
            <el-table-column prop="publish_no" label="公开号" width="100"></el-table-column>
            <el-table-column prop="invention_title" label="专利名称"></el-table-column>
            <el-table-column prop="applicant_name" label="专利权人" width="165"></el-table-column>
            <el-table-column label="发明人" width="180">
              <template slot-scope="scope">
                <span
                  v-for="(inventor, index) in scope.row.inventor_list"
                  :key="inventor"
                  >{{ inventor }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="apply_date" label="申请日" width="100"></el-table-column>
            <el-table-column prop="publish_date" label="公开日" width="100"></el-table-column>
          </el-table>
        </div>
        <div class="pagination">
          <span class="pagination__info">总计{{ pageInfo.total_item_number }}条记录</span>
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
          <el-tag class="recommend__category-tag"
            type="primary"
            v-for="(keyword, index) in recommendList.keyword_list"
            :key="keyword"
            @click.native="changeSearchParams('keywords', keyword)"
            >{{ keyword }}
          </el-tag>
        </div>
        <div class="recommend__category" v-if="recommendList.ipc_main_classification_list.length">
          <span class="recommend__category-name">IPC</span>
          <el-tag class="recommend__category-tag"
            type="primary"
            v-for="(ipc, index) in recommendList.ipc_main_classification_list"
            :key="ipc"
            @click.native="changeSearchParams('ipc_main_classification_no', ipc)"
            >{{ ipc }}
          </el-tag>
        </div>
        <div class="recommend__category" v-if="recommendList.applicant_list.length">
          <span class="recommend__category-name">申请人</span>
          <el-tag class="recommend__category-tag"
            type="primary"
            v-for="(applicant, index) in recommendList.applicant_list"
            :key="applicant"
            @click.native="changeSearchParams('applicant', applicant)"
            >{{ applicant }}
          </el-tag>
        </div>
        <div class="recommend__category" v-if="recommendList.product_list.length">
          <span class="recommend__category-name">产品</span>
          <el-tag class="recommend__category-tag"
            type="primary"
            v-for="(product, index) in recommendList.product_list"
            :key="product"
            @click.native="changeSearchParams('keywords', product)"
            >{{ applicant }}
          </el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideMenu from '../components/SideMenu'
import SearchList from '../components/SearchList'

// import bus from '../bus.js'
import state from '../state/searchResult/state.js'

export default {
  data () {
    return {
      sortSelected: '',
      sortOptions: [
        {
          imgUrl: require('../assets/images/down.png'),
          label: '相关度',
          value: 'relevance',
          direction: 'descending'
        },
        {
          imgUrl: require('../assets/images/top.png'),
          label: '相关度',
          value: 'relevance',
          direction: 'ascending'
        },
        {
          imgUrl: require('../assets/images/down.png'),
          label: '申请时间',
          value: 'apply_date',
          direction: 'descending'
        },
        {
          imgUrl: require('../assets/images/top.png'),
          label: '申请时间',
          value: 'apply_date',
          direction: 'ascending'
        },
        {
          imgUrl: require('../assets/images/down.png'),
          label: '价值度',
          value: 'value_degree',
          direction: 'descending'
        },
        {
          imgUrl: require('../assets/images/top.png'),
          label: '价值度',
          value: 'value_degree',
          direction: 'ascending'
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
      selectAll: false,
      displayType: 'list',
      sortParams: {
        target: '',
        direction: '',
        per_page: '',
        page: ''
      }
    }
  },
  computed: {
    patentList: function () {
      return state.get('patentList')
    },
    recommendList: function () {
      return state.recommendList
    },
    pageInfo: function () {
      return state.pageInfo
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
  methods: {
    buttonStyle (imgUrl) {
      return {
        background: 'url(' + imgUrl + ') no-repeat 5px center #fff',
        paddingLeft: '25px',
        paddingRight: '5px'
      }
    },
    clickToolButton (command) {
    },
    submitSortParams (targetIndex) {
      if (typeof targetIndex === 'number') {
        state.setSortParams('target', this.sortOptions[targetIndex].value)
        state.setSortParams('direction', this.sortOptions[targetIndex].direction)
        state.setSortParams('per_page', state.get('searchParams').per_page)
        state.setSortParams('page', state.get('searchParams').page)
      } else {
        // 清空
      }
    },
    checkPatentInfo (patentId) {
      this.$router.push('/PatentInfo/' + patentId)
    },
    checkRelatedInfo (infoType, patent) {
      // this.$router.push('/RelatedInfo/' + infoType + '/' + patent.patent_id + '/' + patent.applicant_id)
      this.$router.push('/RelatedInfo/' + infoType + '/' + patent.patent_id + '/778929080')
    },
    expandAbstract (patent) {
      patent.abstractExpand = true
    },
    changeSearchParams (field, query) {
      debugger
      state.setSearchParams('field', field)
      state.setSearchParams('query', query)
    },
    changePageSize (pageSize) {
      state.setSearchParams('per_page', pageSize)
    },
    changePageNum (pageNum) {
      state.setSearchParams('page', pageNum)
    }
  },
  components: {
    SideMenu, SearchList
  }
}
</script>

<style lang="scss">
  .searchResult {
    display: flex;
    min-height: calc(100% - 45px);
  }
  .resultPanel {
    width: calc(100% - 200px);
    padding: 10px;
    background: #eee;
  }
  .toolbar {
    display: flex;
    align-items: center;
  }
  .toolbox {
    height: 30px;
  }
  .button {
    padding: 5px 10px;
  }
  .sortSelection {
    width: 120px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .listPanel {
    background: #fff;
    margin-top: 5px;
    padding: 5px;
  }
  .selectAll {
    border-bottom: 2px solid #e5e5e5;
  }
  .patentList {
    display: flex;
    flex-direction: column;
  }
  .patent {
    display: flex;
    align-items: flex-start;
    padding: 10px 0;
    border-bottom: 2px solid #e5e5e5;
  }
  .thumbnail {
    width: 110px;
    height: 160px;
    margin-left: 5px;
  }
  .patentInfo {
    flex: 1;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-right: 10px;
    padding-left: 5px;
    font-size: 14px;
  }
  .patentInfo__header {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    .header__title {
      font-weight: 700;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    .header__tag {
      background: #fff;
      color: #000;
      border-color: #dbdbdb;
    }
    .header__tag-value {
      cursor: pointer;
    }
  }
  .patentInfo__info {
    display: flex;
  }
  .info__item {
    margin-right: 30px;
  }
  .info__link {
    text-decoration: underline;
    cursor: pointer;
    color: #4cbaec;
  }
  .info__link-light {
    color: #ec0000;
  }
  .patentInfo__abstract {
    background: #f8f8f8;
  }
  .patentInfo__abstract-collapse {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    overflow: hidden;
    position: relative;
  }
  .patentInfo__abstract-all {
  }
  .abstract__button {
    position: absolute;
    bottom: 0;
    right: 0;
    color: #b7b7b7;
    text-decoration: underline;
    cursor: pointer;
  }
  .patentInfo__links {
    .info__link {
      margin-right: 15px;
    }
  }
  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    padding: 10px 0;
  }
  .recommendPanel {
    padding-top: 10px;
  }
  .panel__title {
    font-weight: 700;
  }
  .recommend__category {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    font-size: 14px;
    .recommend__category-name {
      flex-basis: 70px;
    }
    .recommend__category-tag {
      margin-right: 10px;
      cursor: pointer;
    }
  }
</style>
