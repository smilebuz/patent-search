import Vue from 'vue'
import bus from './bus.js'

export default new Vue({
  data () {
    return {
      isLogin: '',
      user_id: '',
      session_id: '',
      patent_id: '', // 不同的信息读取 例如专利信息
      applicant_id: '', // 不同的申请人ID
      searchParams: {},
      // sortParams: {},
      patentList: [],
      filterList: [],
      recommendList: [],
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
    user_id (newId) {
      bus.$emit('setUserId', newId)
    },
    patent_id (newId) {
      bus.$emit('setPatentId', newId)
    },
    applicant_id (newId) {
      console.log(newId)
      bus.$emit('setApplicantId', newId)
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
    },
    favorList (newList) {
      bus.$emit('updateFavorList', newList)
    }
  }
})
