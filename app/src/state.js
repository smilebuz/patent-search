import Vue from 'vue'

export default new Vue({
  data () {
    return {
      isLogin: '',
      token: '',
      session_id: '',
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
      return this[key] // 为什么this.key取回undefined this[key]可以
    }
  }
})
