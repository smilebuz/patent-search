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
    <!--div class="filterSelect">
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
            :label="item">{{ item }}
          </el-checkbox>
        </el-checkbox-group>
        <el-checkbox-group class="checkboxgroup"
          v-else
          v-model="filterParams[key]">
          <el-checkbox class="checkbox"
            v-for="(ipc, index) in filterList[key]"
            :key="ipc.section"
            :label="ipc.section">{{ ipc.description }}
          </el-checkbox>
        </el-checkbox-group>
      </el-collapse-item>
    </el-collapse>
    <div class="recentSearch__container" v-if="currentMenu === 'recentSearch'">
      <div class="recentSearch__item"
        v-for="(item, index) in recentSearchList"
        :key="item.timestamp"
        @click="submitSearchParams(item.field, item.query)">{{item.query}}
      </div>
    </div>
  </div>
</template>

<script>
import state from '../state/searchResult/state.js'
import { sendRequest } from '../Api'

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
          name: '最近搜索',
          value: 'recentSearch',
          activate: false
        },
        {
          name: '分类导航',
          value: 'categroyNav',
          activate: false
        }
      ],
      currentMenu: '',
      filterCollapse: '',
      filterPairs: {
        apply_type_list: '专利类型',
        ipc_list: 'IPC分类',
        product_type_list: '产品类型',
        national_economy_industry_list: '国民经济产业',
        applicant_name_list: '申请人',
        area_list: '地区'
      },
      filterParams: {
        apply_type_list: [],
        ipc_list: [],
        product_type_list: [],
        national_economy_industry_list: [],
        applicant_name_list: [],
        area_list: []
      },
      recentSearchParams: {
        per_page: 10,
        page: 1
      },
      recentSearchList: []
    }
  },
  computed: {
    filterList: function () {
      return state.filterList
    }
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
        if (newValue === 'recentSearch') {
          // 最近搜索应该没有参数才对
          sendRequest.recentSearch.get(this.recentSearchParams).then(data => {
            this.recentSearchList = data
          })
        }
      }
    }
  },
  methods: {
    submitSearchParams (field, query) {
      state.setSearchParams('field', field)
      state.setSearchParams('query', query)
    }
  },
  created () {
    this.currentMenu = this.navGroup[0].value
  }
}
</script>

<style lang="scss">
  .sideMenu {
    width: 200px;
    min-width: 200px;
    display: flex;
    flex-direction: column;
  }
  .buttongroup {
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e8e8e8;
    font-size: 15px;
    font-weight: 700;
    .buttongroup__button {
      //border-right: 1px solid #e8e8e8;
      text-align: center;
      cursor: pointer;
      &:hover {
        background: #46b6e9;
        color: #fff;
      }
      &:nth-child(1) {
        flex: 1;
      }
      &:nth-child(2) {
        flex: 2;
      }
      &:nth-child(3) {
        flex: 2;
      }
    }
  }
  .menu-activate {
    background: #46b6e9;
    color: #fff;
  }
  .filterSelect {
    padding: 10px;
    border-bottom: 1px solid #e8e8e8;
  }
  .filter__collpase {

  }
  .filter__item {
    padding-left: 10px;
    padding-right: 10px;
    .el-collapse-item__header {
      height: 35px;
      line-height: 35px;
    }
    .el-collapse-item__arrow {
      line-height: 35px;
    }
    .el-collapse-item__content {
      padding-bottom: 10px;
    }
  }
  .checkboxgroup {
    display: flex;
    flex-direction: column;
    .checkbox {
      margin-left: 0;
      .el-checkbox__label {
        font-size: 12px;
      }
    }
  }
  .recentSearch__container {
    display: flex;
    flex-direction: column;
  }
  .recentSearch__item {
    height: 35px;
    line-height: 35px;
    padding-left: 10px;
    font-size: 14px;
    font-weight: 700;
    border-bottom: 1px solid #e6ebf5;
    cursor: pointer;
    &:hover {
      background: #e6ebf5;
    }
  }
</style>
