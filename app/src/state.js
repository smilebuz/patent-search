import Vue from 'vue'

export default new Vue({
  data () {

  },
  methods: {
    set (key, val) {
      this.$set(this, key, val)
    }
  }
})
