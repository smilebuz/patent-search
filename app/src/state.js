import Vue from 'vue'

export default new Vue({
  data () {
    return {
      isLogin: '',
      token: '',
      session_id: '',
      per_page: 10,
      page: 1,
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
    }
  },
  watch: {
  }
})
