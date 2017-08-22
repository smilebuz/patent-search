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
        query: '',
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
      this.$set(this.searchParams, key, val)
    }
  },
  watch: {
    token (newToken) {
      bus.$emit('setToken', newToken)
    },
    patent_id (newId) {
      bus.$emit('setPatentId', newId)
    },
    searchParams: {
      handler: function (newParams, oldParams) {
        bus.$emit('setSearchParams', newParams)
      },
      deep: true
    }
  }
})
