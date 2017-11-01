import Vue from 'Vue'
import { sendRequest } from '../../Api'

export const infoState = new Vue({
  data () {
    return {
      patentId: '',
      bibliographicData: {},
      detailClaim: {},
      detailDescription: {},
      detailDrawings: {}
    }
  },
  methods: {
    set (key, val) {
      this.$set(this, key, val)
      return Promise.resolve()
    },
    get (key) {
      return this[key]
    }
  },
  watch: {
    patentId (newId) {
      debugger
      let ids = {
        patentId: newId
      }
      sendRequest.patentInfo.get(null, ids).then(data => {
        debugger
        this.bibliographicData = data.bibliographic_data
        this.detailClaim = data.detail_claim
        this.detailDescription = data.detail_description
        this.detailDrawings = data.detail_drawings
      })
    }
  }
})
