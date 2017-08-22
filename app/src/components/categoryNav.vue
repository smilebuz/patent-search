<template lang="html">
  <el-collapse>
    <el-collapse-item v-for='(value, key) in navs' :key='key' v-bind:title='value.title' class='nav-item'>
      <p v-for='item in value.items' @click='loadNavObj(item)'>{{ item }}</p>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import bus from '../bus.js'

export default {
  data () {
    return {
      navs: {
        myPatent: {
          title: '我的专利',
          items: ['国网江苏省电力公司南京供电公司', '国网江苏省电力公司苏州供电公司', '国网江苏省电力公司徐州供电公司']
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
  },
  methods: {
    loadNavObj (root) {
      bus.$emit('getNavObj', root)
    }
  }
}
</script>

<style lang="scss">
</style>
