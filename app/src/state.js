import Vue from 'vue'

export default new Vue({
  data () {
    return {}
  },
  methods: {
    set (key, val) {
      this.$set(this, key, val)
    }
  }
})
