<template lang="html">
  <div>
    <div class='btn-group'>
      <el-button>筛选</el-button>
      <el-button>取消</el-button>
    </div class='btn-group'>
    <el-collapse v-model='filter'>
      <el-collapse-item v-for='item, index in filters' :key='index' v-bind:title='item.message' class='filter-item'></el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filter: ['1'],
      filters: [
        {
          message: '专利类型',
          value: ''
        },
        {
          message: '法律状态',
          value: ''
        },
        {
          message: 'IPC分类',
          value: ''
        },
        {
          message: '产品类型',
          value: ''
        },
        {
          message: '国民经济产业',
          value: ''
        },
        {
          message: '申请人',
          value: ''
        },
        {
          message: '维持年限',
          value: ''
        },
        {
          message: '申请时间',
          value: ''
        },
        {
          message: '地区统计',
          value: ''
        },
        {
          message: '购买力',
          value: ''
        }
      ]
    }
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
</style>
