<template lang="html">
  <div class="recommend">
    <p>相关推荐</p>
    <div>
      <p>关键词</p>
      <el-tag type='gray' v-for='keyword, index in keyword_list' :key='index' class="recommend-item">{{ keyword.message }}</el-tag>
    </div>
    <div>
      <p>IPC</p>
      <el-tag type='gray' v-for='ipc, index in ipc_main_classification_list' :key='index' class='recommend-item'>{{ ipc.message }}</el-tag>
    </div>
    <div>
      <p>申请人</p>
      <el-tag type='gray' v-for='applicant, index in applicant_list' :key='index' class='recommend-item'>{{ applicant.message }}</el-tag>
    </div>
    <div>
      <p>产品</p>
      <el-tag type='gray' v-for='product, index in product_list' :key='index' class='recommend-item'>{{ product.message }}</el-tag>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      product_list: [
        {
          message: '变频变压器'
        },
        {
          message: '滤波装置'
        }
      ],
      keyword_list: [
        {
          message: '电力载波'
        },
        {
          message: '电力'
        },
        {
          message: '电力设备'
        }
      ],
      ipc_main_classification_list: [
        {
          message: 'G08C19/00'
        },
        {
          message: 'H04B3/50'
        },
        {
          message: 'G06F15/20'
        },
        {
          message: 'H01H47/00'
        }
      ],
      applicant_list: [
        {
          message: '国家电网'
        },
        {
          message: '信息通信分公司'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  .recommend {
    text-align: left;
    .recommend-item {
      margin-right: 1em;
    }
  }
</style>
