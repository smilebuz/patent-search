import Vue from 'vue'
import bus from './bus.js'

export default new Vue({
  data () {
    return {
      isLogin: '',
      userId: '',
      session_id: '',
      patentId: '', // 不同的信息读取 例如专利信息
      applicantId: '', // 不同的申请人ID
      searchParams: {},
      // sortParams: {},
      patentList: [],
      filterList: [],
      recommendList: [],
      favorId: '', // 收藏目录ID
      favorList: []
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
    userId (newId) {
      bus.$emit('setUserId', newId)
    },
    patentId (newId) {
      bus.$emit('setPatentId', newId)
    },
    applicantId (newId) {
      bus.$emit('setApplicantId', newId)
    },
    favorId (newId) {
      bus.$emit('setFavorId', newId)
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
    patentList: {
      handler: function (newList) {
        bus.$emit('updatePatentList', newList)
      }
    },
    filterList (newList) {
      bus.$emit('updateFilterList', newList)
    },
    recommendList (newList) {
      bus.$emit('updateRecommendList', newList)
    },
    favorList (newList) {
      bus.$emit('updateFavorList', newList)
    }
  }
})
