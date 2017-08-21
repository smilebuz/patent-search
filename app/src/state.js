import Vue from 'vue'
import bus from './bus.js'

export default new Vue({
  data () {
    return {
      isLogin: '',
      token: '',
      session_id: '',
      patent_id: '', // 不同的信息读取 例如申请人信息 专利信息
      searchParams: {
        per_page: 10,
        page: 1
      },
      patentList: [],
      filterList: [],
      recommendList: []
    }
  },
  methods: {
    set (key, val) {
      this.$set(this, key, val)
    },
    get (key) {
      return this[key]
    },
    setSearchParams (key, val) {
      this.$set(this, this.searchParams[key], val)
    }
  },
  watch: {
    token: function (newToken) {
      bus.$emit('setToken', newToken)
    },
    patent_id: function (newId) {
      bus.$emit('setPatentId', newId)
    }
  }
})
