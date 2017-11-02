<template>
  <div class="sideMenu">
    <div class="buttongroup">
      <div class="buttongroup__button"
        v-for="(item, index) in navGroup"
        :key="item.value">
        {{ item.name }}
      </div>
    </div>
    <!--div class="filterSelect">
      <el-select size="small"></el-select>
    </div-->
    <el-collapse class="filter__collapse" v-model="filterCollapse">
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
  </div>
</template>

<script>
import state from '../state/searchResult/state.js'

export default {
  data () {
    return {
      navGroup: [
        {
          name: '过滤',
          value: 'filter'
        },
        {
          name: '最近搜索',
          value: 'recentSearch'
        },
        {
          name: '分类导航',
          value: 'categroyNav'
        }
      ],
      currentNav: 'filter',
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
      }
    }
  },
  computed: {
    filterList: function () {
      return state.filterList
    }
  }
}
</script>

<style lang="scss">
  .sideMenu {
    width: 200px;
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
</style>
