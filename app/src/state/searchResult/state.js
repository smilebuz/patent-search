import Vue from 'vue'
import bus from '../../bus.js'
import { sendRequest } from '../../Api'

export default new Vue({
  data () {
    return {
      patentId: '', // 不同的信息读取 例如专利信息
      applicantId: '', // 不同的申请人ID
      searchParams: {
        apply_type: 'inventions',
        search_type: 'common',
        field: 'keywords',
        query: '',
        per_page: 10,
        page: 1
      },
      patentList: [],
      filterList: [],
      recommendList: {},
      pageInfo: {
        current_page: -1,
        total_page_number: -1,
        total_item_number: -1
      },
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
      handler: function (newParams) {
        // bus.$emit('updateSearchParams', newParams)
        sendRequest.search.post(newParams).then(data => {
          this.set('patentList', data.patent_list)
          this.set('recommendList', data.recommend_list)
          this.set('filterList', data.filter_list)
          for (let prop in this.pageInfo) {
            if (this.pageInfo.hasOwnProperty(prop)) {
              this.pageInfo[prop] = data[prop]
            }
          }
        })
      },
      deep: true
    },
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
