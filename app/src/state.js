import Vue from 'vue'
import bus from './bus.js'

export default new Vue({
  data () {
    return {
      isLogin: '',
      token: '',
      session_id: '',
      patent_id: '', // 不同的信息读取 例如申请人信息 专利信息
      searchParams: {},
      // sortParams: {},
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
    },
    setSortParams (key, vale) {
      this.$set(this.sortParams, key, vale)
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
        bus.$emit('updateSearchParams', newParams)
      },
      deep: true
    },
    /*
    sortParams: {
      handler: function (newParams, oldParams) {
        bus.$emit('updateSortParams', newParams)
      },
      deep: true
    }
    */
    patentList (newList) {
      bus.$emit('updatePatentList', newList)
    },
    filterList (newList) {
      bus.$emit('updateFilterList', newList)
    },
    recommendList (newList) {
      bus.$emit('updateRecommendList', newList)
    }
  }
})
