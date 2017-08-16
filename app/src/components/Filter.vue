<template lang="html">
  <div>
    <div class='btn-group'>
      <el-button>筛选</el-button>
      <el-button>取消</el-button>
    </div class='btn-group'>
    <el-collapse v-model='filter'>
      <el-collapse-item v-for='(value, key) in filters' :key='key' v-bind:title='value.title' class='filter-item'>
        <div v-for='item, index in value.items' :key='item'>
          <el-checkbox v-bind:label='item'></el-checkbox>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import state from '../state.js'

export default {
  data () {
    return {
      filter: ['1'],
      filters: {
        patent_type: {
          title: '专利类型',
          items: []
        },
        legat_status: {
          title: '法律状态',
          items: []
        },
        ipc_classification_cn_name_list: {
          title: 'IPC分类',
          items: []
        },
        product_type: {
          title: '产品类型',
          items: []
        },
        national_economy_industry_list: {
          title: '国民经济产业',
          items: []
        },
        applicant_name_list: {
          title: '申请人',
          items: []
        },
        time_last: {
          title: '维持年限',
          items: []
        },
        apply_date: {
          title: '申请时间',
          items: []
        },
        area_list: {
          title: '地区统计',
          items: []
        },
        purchase_power: {
          title: '购买力',
          items: []
        }
      }
    }
  },
  mounted: function () {
    let filterList = state.get('filterList')
    this.filters.ipc_classification_cn_name_list.items = filterList.ipc_classification_cn_name_list
    this.filters.product_type.items = filterList.product_type_list
    this.filters.national_economy_industry_list.items = filterList.national_economy_industry_list
    this.filters.applicant_name_list.items = filterList.applicant_name_list
    this.filters.area_list.items = filterList.area_list
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
</style>
