<template>
  <div class="sideMenu">
    <div class="buttongroup">
      <div class="buttongroup__button"
        v-for="(item, index) in navGroup"
        :key="item.value"
        :class="{ 'menu-activate': item.activate}"
        @click="currentMenu = item.value">
        {{ item.name }}
      </div>
    </div>
    <!--div class="filterSelect sideMenu__select">
      <el-select size="small"></el-select>
    </div-->
    <el-collapse class="filter__collapse"
      v-model="filterCollapse"
      v-if="currentMenu === 'filter'">
      <el-collapse-item class="filter__item"
        v-for="(value, key) in filterPairs"
        :key="key"
        :title="value">
        <el-checkbox-group class="checkboxgroup"
          v-if="key !== 'ipc_list'"
          v-model="filterParams[key]">
          <el-checkbox class="checkbox"
            v-for="(item, index) in filterList[key]"
            :key="index"
            :label="item.item"
            :title="item.item">
            <span class="checkbox__text">{{ item.item }}</span>
            <span class="checkbox__frequency">({{ item.frequency }})</span>
          </el-checkbox>
        </el-checkbox-group>
        <!--el-checkbox-group class="checkboxgroup"
          v-else
          v-model="filterParams[key]">
          <el-checkbox class="checkbox"
            v-for="(ipc, index) in filterList[key]"
            :key="ipc.section"
            :label="ipc.section">{{ ipc.description }}
          </el-checkbox>
        </el-checkbox-group-->
      </el-collapse-item>
    </el-collapse>
    <div class="recentSearch__container" v-if="currentMenu === 'recentSearch'">
      <div class="recentSearch__item"
        v-for="(item, index) in recentSearchList"
        :key="item.timestamp"
        @click="submitSearchParams(item.field, item.query)">{{item.query}}
      </div>
    </div>
    <div class="" v-if="currentMenu === 'categoryNav'">
      <!-- <div class="navSelect sideMenu__select">
        <el-select size="small" v-model="navType">
          <el-option
            v-for="(option, index) in navOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value">{{ option.label }}
          </el-option>
        </el-select>
      </div> -->
      <div class="navToolbox">
        <img class="navToolbox-backLevel"
          src="../assets/images/back-level.png"
          alt="返回上一级"
          @click="backLevel">
        <!-- <div class="pagination sidemenu-pagination">
          <el-pagination
            small
            layout="prev, next"
            :current-page="navPageInfo.current_page"
            :page-size="navParams.per_page"
            :page-count="navPageInfo.total_page_number"
            @current-change="changeNavPageNum">
          </el-pagination>
        </div> -->
      </div>
      <div class="navContent">
        <div class="navContent__item"
          v-for="(content, index) in navList"
          :key="content.description"
          >
          <span class="navContent__item-span navContent__item-description"
            :title="content.description"
            @click="nextLevel(content.symbol)"
            >{{ content.description }}
          </span>
          <span class="navContent__item-span navContent__item-number"
            @click="submitSearchParams('ipc_main_classification_no', content.symbol)"
            >({{ content.child_count }})
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import state from '../state/searchResult/state.js'
import { sendRequest } from '../Api'

require('../assets/scss/side-menu.scss')

export default {
  data () {
    return {
      navGroup: [
        {
          name: '过滤',
          value: 'filter',
          activate: false
        },
        {
          name: '最近',
          value: 'recentSearch',
          activate: false
        },
        {
          name: '导航',
          value: 'categoryNav',
          activate: false
        }
      ],
      currentMenu: '',
      filterCollapse: '',
      filterPairs: {
        apply_type_list: '专利类型',
        // ipc_list: 'IPC分类',
        product_type_list: '产品类型',
        national_economy_industry_list: '国民经济产业',
        applicant_name_list: '申请人',
        area_list: '地区'
      },
      filterParams: {
        apply_type_list: [],
        // ipc_list: [],
        product_type_list: [],
        national_economy_industry_list: [],
        applicant_name_list: [],
        area_list: [],
        maintenance_period_list: [],
        application_time_span_list: [],
        registered_capital_list: [],
        per_page: 10,
        page: 1
      },
      recentSearchList: [],
      navOptions: [
        {
          label: 'ipc',
          value: 'ipc'
        },
        {
          label: '国民经济',
          value: 'national_economy'
        },
        {
          label: '产品类型',
          value: 'product_type'
        }
      ],
      navList: [],
      navType: '',
      navParams: {
        symbol: ''
      },
      // nav搜索记录栈
      navParamsStack: []
      // navIpcParams: {
      //   preQuery: '',
      //   preField: '',
      //   query: '',
      //   field: ''
      // },
      // navNeicParams: {
      //   preQuery: '',
      //   preField: '',
      //   query: '',
      //   field: ''
      // },
      // navProductTypeParams: {
      //   preQuery: '',
      //   preField: '',
      //   query: '',
      //   field: ''
      // },
    }
  },
  computed: {
    filterList: function () {
      return state.filterList
    }
  },
  methods: {
    submitSearchParams (field, query) {
      state.setSearchParams('field', field)
      state.setSearchParams('query', query)
      state.setSearchParams('search_mode', 'user_click')
    },
    backLevel () {
      switch (this.navType) {
        case 'ipc':
          let lastSymbol = this.navParamsStack.pop()
          lastSymbol = this.navParamsStack.pop()
          // 需要判断是不是最高级
          if (!lastSymbol) {
            this.$message({
              message: '当前已经是最高级',
              type: 'warning'
            })
          } else {
            this.navParams.symbol = lastSymbol
          }
          break
        case 'neic':
          break
        case 'product_type':
          break
        default:
          break
      }
    },
    nextLevel (symbol) {
      this.navParams.symbol = symbol
    }
    // changeNavPageNum (pageNum) {
    //   this.navParams.page = pageNum
    // }
  },
  watch: {
    currentMenu: {
      handler: function (newValue) {
        this.navGroup.forEach(nav => {
          if (nav.value === newValue) {
            nav.activate = true
          } else {
            nav.activate = false
          }
        })
        switch (newValue) {
          case 'recentSearch':
            // 最近搜索应该没有参数才对
            sendRequest.recentSearch.get(null).then(data => {
              this.recentSearchList = data
            })
            break
          case 'categoryNav':
            this.navType = this.navOptions[0].value
            break
          default:
            break
        }
      }
    },
    navType: {
      handler: function (newType) {
        switch (newType) {
          case 'ipc':
            this.navParamsStack = []
            this.navParams.symbol = 'IPC'
            break
          default:
            break
        }
      }
    },
    filterParams: {
      handler: function (newParams) {
        // 提交过滤
        for (let prop in newParams) {
          if (newParams.hasOwnProperty(prop)) {
            state.setFilterParams(prop, newParams[prop])
          }
        }
      },
      deep: true
    },
    navParams: {
      handler: function (newParams) {
        // 请求
        sendRequest.categoryNav.get(this.navParams).then(data => {
          this.navList = data
          for (let prop in this.navPageInfo) {
            if (this.navPageInfo.hasOwnProperty(prop)) {
              this.navPageInfo[prop] = data[prop]
            }
          }
          this.navParamsStack.push(this.navParams.symbol)
        })
      },
      deep: true
    }
  },
  created () {
    this.currentMenu = this.navGroup[0].value
  }
}
</script>

<style lang="scss">
</style>
