import Vue from 'vue'
import bus from '../../bus.js'
import { sendRequest } from '../../Api'

export default new Vue({
  data () {
    return {
      patentId: '', // 不同的信息读取 例如专利信息
      applicantId: '', // 不同的申请人ID

      searchParams: {
        // apply_type: 'inventions',
        search_mode: '',
        search_type: 'common',
        field: 'keywords',
        query: '',
        per_page: 10,
        page: 1
      },
      sortParams: {
        target: '',
        direction: '',
        per_page: 10,
        page: 1
      },
      filterParams: {
        apply_type_list: [],
        product_type_list: [],
        ipc_classification_cn_name_list: [],
        national_economy_industry_list: [],
        applicant_name_list: [],
        area_list: [],
        maintenance_period_list: [],
        application_time_span_list: [],
        registered_capital_list: [],
        per_page: 10,
        page: 1
      },

      loadingData: false,
      loadingPatentList: false,
      patentList: [],
      filterList: [],
      recommendList: {
        keyword_list: [],
        ipc_main_classification_list: [],
        applicant_list: [],
        product_list: []
      },
      pageInfo: {
        current_page: -1,
        total_page_number: -1,
        total_item_number: -1,
        current_page_item_number: -1,
        total_hits: -1,
        took: -1
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
    setSortParams (key, val) {
      this.$set(this.sortParams, key, val)
    },
    setFilterParams (key, val) {
      this.$set(this.filterParams, key, val)
    },
    updatePatentList (index, patent) {
      this.$set(this.patentList, index, patent)
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
        this.loadingData = true
        sendRequest.search.get(newParams).then(data => {
          let filterList = []
          this.set('patentList', data.patent_list)
          for (let patent of this.patentList) {
            if (!patent.abstract_info) {
              // 将null改为空字符串
              patent.abstract_info = ''
            }
            if (patent.abstract_info.length > 140) {
              patent.abstractExpand = '1'
            } else {
              patent.abstractExpand = '3'
            }
            patent.selected = false
            patent.value_degree.value = Math.floor(patent.value_degree.value)
            patent.fullStarNum = Math.floor(patent.value_degree.value / 2)
            patent.blankStarNum = Math.floor((10 - patent.value_degree.value) / 2)
          }
          this.set('recommendList', data.recommend_list)
          filterList.apply_type_list = data.filter_sidebar_list.filter_item_map.apply_type
          filterList.national_economy_industry_list = data.filter_sidebar_list.filter_item_map.neic
          filterList.product_type_list = data.filter_sidebar_list.filter_item_map.product_type
          filterList.applicant_name_list = data.filter_sidebar_list.filter_item_map.applicant_name
          filterList.area_list = data.filter_sidebar_list.filter_item_map.area
          filterList.ipc_classification_cn_name_list = data.filter_sidebar_list.filter_item_map.ipc_section || []
          this.set('filterList', filterList)

          // 更新分页信息
          for (let prop in this.pageInfo) {
            if (this.pageInfo.hasOwnProperty(prop)) {
              this.pageInfo[prop] = data[prop]
            }
          }

          this.loadingData = false

          bus.$emit('updateSearchParams', newParams.query)
        })
      },
      deep: true
    },
    sortParams: {
      handler: function (newParams) {
        this.loadingPatentList = true
        sendRequest.sort.get(newParams).then(data => {
          this.set('patentList', data.patent_list)
          for (let patent of this.patentList) {
            if (!patent.abstract_info) {
              // 将null改为空字符串
              patent.abstract_info = ''
            }
            // patent.abstractExpand = !(patent.abstract_info.length > 140)
            if (patent.abstract_info.length > 140) {
              patent.abstractExpand = '1'
            } else {
              patent.abstractExpand = '3'
            }
            patent.selected = false
            patent.value_degree.value = Math.floor(patent.value_degree.value)
            patent.fullStarNum = Math.floor(patent.value_degree.value / 2)
            patent.blankStarNum = Math.floor((10 - patent.value_degree.value) / 2)
          }
          this.loadingPatentList = false
          this.patentList.forEach(patent => {
            console.log(patent.value_degree.value)
          })
        })
      },
      deep: true
    },
    filterParams: {
      handler: function (newParams) {
        this.loadingPatentList = true
        sendRequest.filter.post(newParams).then(data => {
          this.set('patentList', data.patent_list)
          for (let patent of this.patentList) {
            if (!patent.abstract_info) {
              // 将null改为空字符串
              patent.abstract_info = ''
            }
            // patent.abstractExpand = !(patent.abstract_info.length > 140)
            if (patent.abstract_info.length > 140) {
              patent.abstractExpand = '1'
            } else {
              patent.abstractExpand = '3'
            }
            patent.selected = false
            patent.value_degree.value = Math.floor(patent.value_degree.value)
            patent.fullStarNum = Math.floor(patent.value_degree.value / 2)
            patent.blankStarNum = Math.floor((10 - patent.value_degree.value) / 2)
          }

          // 更新分页信息
          for (let prop in this.pageInfo) {
            if (this.pageInfo.hasOwnProperty(prop)) {
              this.pageInfo[prop] = data[prop]
            }
          }

          this.loadingPatentList = false
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
