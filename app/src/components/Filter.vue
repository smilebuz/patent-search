<template lang="html">
  <div>
    <div class='btn-group'>
      <el-button @click='filter'>筛选</el-button>
      <el-button @click='cancel'>取消</el-button>
    </div class='btn-group'>
    <el-collapse v-model='activeFilters'>
      <el-collapse-item v-for='(value, key) in filters' :key='key' v-bind:title='value.title' class='filter-item'>
        <el-checkbox-group v-if='key === "maintenance_period_list"|| key === "purchasing_power_list"' v-model='value.checkList' class="checkbox-group">
          <el-checkbox v-for='label, index in value.labels' :key='index' v-bind:label='label' class='checkbox'></el-checkbox>
        </el-checkbox-group>
        <el-checkbox-group v-else v-model='value.checkList' class="checkbox-group">
          <el-checkbox v-for='item, index in value.items' :key='index' v-bind:label='item' class="checkbox"></el-checkbox>
        </el-checkbox-group>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import state from '../state.js'
import bus from '../bus.js'
import Api from '../Api.js'

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
              operator: '='
            },
            {
              maintenance_period: 2,
              operator: '='
            },
            {
              maintenance_period: 3,
              operator: '='
            },
            {
              maintenance_period: 5,
              operator: '='
            },
            {
              maintenance_period: 10,
              operator: '='
            },
            {
              maintenance_period: 10,
              operator: '>'
            }
          ],
          checkList: []
        },
        application_time_list: {
          title: '申请时间',
          items: ['1年', '2年', '3年', '5年', '10年', '10年以上'],
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
              right: 1000
            },
            {
              left: 1000,
              right: 2000
            },
            {
              left: 2000,
              right: 5000
            },
            {
              left: 5000,
              right: 8000
            },
            {
              left: 10000,
              right: -1
            }
          ],
          checkList: []
        }
      }
    }
  },
  methods: {
    filter: function () {
      let params = {}
      for (let prop in this.filters) {
        if (this.filters.hasOwnProperty(prop)) {
          switch (prop) {
            case 'maintenance_period_list':
              let maintenanceList = this.filters[prop].checkList
              let maintenanceIndex = []
              let paramMaintenanceList = []
              if (maintenanceList) {
                for (let time of maintenanceList) {
                  let index = this.filters[prop].labels.findIndex((value, i, arr) => {
                    return value === time
                  })
                  maintenanceIndex.push(index)
                }
                for (let index of maintenanceIndex) {
                  paramMaintenanceList.push(this.filters[prop].items[index])
                }
                params[prop] = paramMaintenanceList
              } else {
                params[prop] = []
              }
              break
            /*
            case 'application_time_list':

              break
            */
            case 'purchasing_power_list':
              let purchaseList = this.filters[prop].checkList
              let purchaseIndex = []
              let paramPurchaseList = []
              if (maintenanceList) {
                for (let purchase of purchaseList) {
                  let index = this.filters[prop].labels.findIndex((value, i, arr) => {
                    return value === purchase
                  })
                  purchaseIndex.push(index)
                }
                for (let index of purchaseIndex) {
                  paramPurchaseList.push(this.filters[prop].items[index])
                }
                params[prop] = paramPurchaseList
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
      params.per_page = 30
      params.page = 1
      console.log(JSON.stringify(params))
      this.$http.post(Api.filter, params)
        .then((response) => {
          bus.$emit('filter', response.data.result)
        })
        .catch((error) => {
          console.log(error)
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
  mounted: function () {
    let filterList = state.get('filterList')
    for (var prop in filterList) {
      if (filterList.hasOwnProperty(prop)) {
        this.filters[prop].items = filterList[prop]
      }
    }
    /*
    this.filters.ipc_classification_cn_name_list.items = filterList.ipc_classification_cn_name_list
    this.filters.product_type.items = filterList.product_type_list
    this.filters.national_economy_industry_list.items = filterList.national_economy_industry_list
    this.filters.applicant_name_list.items = filterList.applicant_name_list
    this.filters.area_list.items = filterList.area_list
    */
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
