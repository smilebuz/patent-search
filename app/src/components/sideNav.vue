<template lang="html">
  <el-collapse>
    <el-collapse-item v-for="(value, key) in navs" :key="key" v-bind:title="value.title" class="nav-item">
      <p v-for="item in value.items" @click="loadNavObj(item.name)">
        {{ item.name }}
      </p>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import bus from '../bus.js'
import { sendRequest } from '../Api'

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
  },
  methods: {
    loadNavObj (root) {
      bus.$emit('getNavObj', root)
    }
  },
  mounted () {
    sendRequest.userPatent.get().then(data => {
      this.navs.myPatent.items = data
    })
  }
}
</script>

<style lang="scss">
</style>
