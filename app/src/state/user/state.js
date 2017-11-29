import Vue from 'Vue'

export const userState = new Vue({
  data () {
    return {
      isLogin: '',
      userId: '',
      username: ''
    }
  },
  methods: {
    get (key) {
      return this[key]
    },
    set (key, val) {
      this.$set(this, key, val)
    }
  }
})
