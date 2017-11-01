<template lang="html">
  <div>
    <div class="btn-group">
      <el-button @click="filter">筛选</el-button>
      <el-button @click="cancel">取消</el-button>
    </div class="btn-group">
    <el-collapse v-model="activeFilters">
      <el-collapse-item v-for="(value, key) in filters"
        :key="key" v-bind:title="value.title" class="filter-item">
        <el-checkbox-group v-if="key === 'maintenance_period_list' || key === 'application_time_list' || key === 'purchasing_power_list'" v-model="value.checkList" class="checkbox-group">
          <el-checkbox v-for="label, index in value.labels" :key="index" v-bind:label="label" class="checkbox"></el-checkbox>
        </el-checkbox-group>
        <div v-else>
          <el-checkbox-group v-model="value.checkList" class="checkbox-group">
            <el-checkbox v-for="item, index in value.items" :key="index" v-bind:label="item" class="checkbox"></el-checkbox>
          </el-checkbox-group>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import state from '../state/searchResult/state.js'
import bus from '../bus.js'
import { sendRequest } from '../Api.js'

export default {
  data () {
    return {
      activeFilters: [],
      filters: {
        apply_type_list: {
          title: '专利类型',
          items: ['发明专利', '实用新型专利', '外观专利'],
          checkList: []
        },
        law_status_value_list: {
          title: '法律状态',
          items: ['公开', '实审', '有权', '驳回', '未缴年费'],
          checkList: []
        },
        ipc_classification_cn_name_list: {
          title: 'IPC分类',
          items: [],
          checkList: []
        },
        product_type_list: {
          title: '产品类型',
          items: [],
          checkList: []
        },
        national_economy_industry_list: {
          title: '国民经济产业',
          items: [],
          checkList: []
        },
        applicant_name_list: {
          title: '申请人',
          items: [],
          checkList: []
        },
        maintenance_period_list: {
          title: '维持年限',
          labels: ['1年', '2年', '3年', '5年', '10年', '10年以上'],
          items: [
            {
              maintenance_period: 1,
              operator: 'equal'
            },
            {
              maintenance_period: 2,
              operator: 'equal'
            },
            {
              maintenance_period: 3,
              operator: 'equal'
            },
            {
              maintenance_period: 5,
              operator: 'equal'
            },
            {
              maintenance_period: 10,
              operator: 'equal'
            },
            {
              maintenance_period: 10,
              operator: 'greater_than'
            }
          ],
          checkList: []
        },
        application_time_list: {
          title: '申请时间',
          labels: ['1年', '2年', '3年', '5年', '10年', '10年以上'],
          items: [
            {
              time_span: 1,
              operator: 'equal'
            },
            {
              time_span: 2,
              operator: 'equal'
            },
            {
              time_span: 3,
              operator: 'equal'
            },
            {
              time_span: 5,
              operator: 'equal'
            },
            {
              time_span: 10,
              operator: 'equal'
            },
            {
              time_span: 10,
              operator: 'greater_than'
            }
          ],
          checkList: []
        },
        area_list: {
          title: '地区统计',
          items: [],
          checkList: []
        },
        purchasing_power_list: {
          title: '购买力',
          labels: ['1000万以下', '1000万-2000万', '2000万-5000万', '5000万-8000万', '1亿及以上'],
          items: [
            {
              left: 0,
              right: 10000000
            },
            {
              left: 10000000,
              right: 20000000
            },
            {
              left: 20000000,
              right: 50000000
            },
            {
              left: 50000000,
              right: 80000000
            },
            {
              left: 100000000,
              right: -1
            }
          ],
          checkList: []
        }
      }
    }
  },
  methods: {
    refreshFilterList: function (filterList) {
      for (var prop in filterList) {
        if (filterList.hasOwnProperty(prop)) {
          this.filters[prop].items = filterList[prop]
        }
      }
    },
    filter: function () {
      let params = {}
      for (let prop in this.filters) {
        if (this.filters.hasOwnProperty(prop)) {
          switch (prop) {
            case 'maintenance_period_list':
            case 'application_time_list':
            case 'purchasing_power_list':
              let checkList = this.filters[prop].checkList
              let checkIndex = []
              let paramList = []
              if (checkList) {
                for (let time of checkList) {
                  let index = this.filters[prop].labels.findIndex((value, i, arr) => {
                    return value === time
                  })
                  checkIndex.push(index)
                }
                for (let index of checkIndex) {
                  paramList.push(this.filters[prop].items[index])
                }
                params[prop] = paramList
              } else {
                params[prop] = []
              }
              break
            default:
              params[prop] = this.filters[prop].checkList
          }
        }
      }
      params.session_id = state.get('session_id')
      params.per_page = state.get('per_page')
      params.page = state.get('page')
      sendRequest.filter.post(params).then((data) => {
        state.set('patentList', data.patent_list)
        for (let prop in this.filters) {
          if (this.filters.hasOwnProperty(prop)) {
            this.filters[prop].checkList.splice(0, this.filters[prop].checkList.length)
          }
        }
      })
    },
    cancel: function () {
      for (let prop in this.filters) {
        if (this.filters.hasOwnProperty(prop)) {
          this.filters[prop].checkList.splice(0, this.filters[prop].checkList.length)
        }
      }
    }
  },
  created: function () {
    bus.$on('updateFilterList', newList => {
      this.refreshFilterList(newList)
    })
  },
  mounted: function () {
    this.refreshFilterList(state.get('filterList'))
  }
}
</script>

<style lang="scss">
  .btn-group {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;
  }
  .el-collapse-item__header__arrow {
    display: none;
  }
  .filter-item {
    text-align: left;
  }
  .checkbox-group {
    display: flex;
    flex-direction: column;
    .checkbox {
      margin-left: 1em;
    }
  }
</style>
