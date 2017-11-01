import Vue from 'Vue'
import bus from '../../bus.js'

export const userState = new Vue({
  data () {
    return {
      isLogin: '',
      userId: ''
    }
  },
  methods: {
    get (key) {
      return this[key]
    },
    set (key, val) {
      this.$set(this, key, val)
    }
  },
  watch: {
    userId (newId) {
      bus.$emit('setUserId', newId)
    }
  }
})
