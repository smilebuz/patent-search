<template lang="html">
  <el-collapse>
    <el-collapse-item v-for='(value, key) in navs' :key='key' v-bind:title='value.title' class='nav-item'>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  data () {
    return {
      navs: {
        myPatent: {
          title: '我的专利',
          items: []
        },
        ipc_classification: {
          title: 'IPC分类',
          items: []
        },
        national_economy: {
          title: '国民经济分类',
          items: []
        },
        product_type: {
          title: '产品分类',
          items: []
        },
        organizaiton: {
          title: '机构分类',
          items: []
        }
      }
    }
  }
}
</script>

<style lang="scss">
</style>
