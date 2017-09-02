// import Vue from 'Vue'
import axios from 'axios'
import bus from './bus.js'
import state from './state.js'

export const Api = {
  'login': '/api/users/login', // post
  'logout': '/api/users/logout', // post
  'register': '/api/users/register', // post

  'search': '/api/search', // post
  'filter': '/api/filter', // post
  'sort': '/api/sort', // post

  'patentInfo': '/api/patents/{patentId}', // get
  'similarPatent': '/api/patents/{patentId}/similarities?per_page=5&page=1', // get
  'applicant': '/api/applicants/{applicantId}', // get
  'valuedegree': '/api/patents/{patentId}/values', // get
  'legatStatus': '/api/patents/patent_id/legal_statuses', // get
  'potentialBuyer': '/api/patents/{patentId}/applicants?intent=potential_buyer&per_page=10&page=1', // get

  'recentSearch': '/api/users/{userId}/recent_queries?per_page=5&page=1', // get
  'userPatent': '/api/users/{userId}/applicants?per_page=3&page=1', // get

  'getFavor': '/api/users/{userId}/favorites?per_page=4&page=1', // get
  'createFavor': '/api/users/{userId}/favorites', // post
  'deleteFavorMenu': '/api/users/{userId}/favorites/{favorId}', // delete
  'deleteFavor': '/api/users/{userId}/favorites/{favorId}/patents/{patentId}', // delete
  'addFavor': '/api/users/{userId}/favorites/{favorId}/patents/{patentId}', // put
  'favorPatent': '/api/users/{userId}/favorites/{favorId}' // get

}

export let Ids = {
  patentId: '',
  applicantId: '',
  userId: '',
  favorId: ''
}

bus.$on('setPatentId', (newId) => {
  Ids.patentId = newId
})

bus.$on('setApplicantId', (newId) => {
  Ids.applicantId = newId
})

bus.$on('setUserId', (newId) => {
  Ids.userId = newId
})

bus.$on('setFavorId', (newId) => {
  Ids.favorId = newId
})

export const sendRequest = ((apilist) => {
  let list = {}
  let apiReg = /({[a-zA-Z]+})/g // ?先行匹配有问题 只能用后行匹配 但是拿到userId怎么替换掉大括号{}

  for (let api in apilist) {
    list[api] = {
      post: params => {
        let idkeys = apilist[api].match(apiReg)
        if (idkeys) {
          for (let idkey of idkeys) {
            idkey = idkey.substring(1, idkey.length - 1)
            apilist[api] = apilist[api].replace(apiReg, Ids[idkey])
          }
        }
        console.log('api post:', apilist[api])
        return axios.post(apilist[api], params)
          .then(response => {
            return Promise.resolve(response.data.result) // 将response.data.result转成Promise对象
          })
          .catch(error => {
            console.log(error)
          })
      },
      get: params => {
        if (apilist[api].includes('{favorId}')) {
          apilist[api] = apilist[api].replace('{favorId}', state.get('favor_id'))
        }
        let idkeys = apilist[api].match(apiReg)
        if (idkeys) {
          for (let idkey of idkeys) {
            idkey = idkey.substring(1, idkey.length - 1)
            debugger
            apilist[api] = apilist[api].replace(apiReg, Ids[idkey])
          }
        }
        console.log('api get:', apilist[api])
        if (params) {
          return axios.get(apilist[api], params)
            .then(response => {
              return Promise.resolve(response.data.result)
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          return axios.get(apilist[api])
            .then(response => {
              return Promise.resolve(response.data.result)
            })
            .catch(error => {
              console.log(error)
            })
        }
      },
      put: () => {
        let idkeys = apilist[api].match(apiReg)
        if (idkeys) {
          for (let idkey of idkeys) {
            idkey = idkey.substring(1, idkey.length - 1)
            apilist[api] = apilist[api].replace(apiReg, Ids[idkey])
          }
        }
        console.log('api put:', apilist[api])
        return axios.put(apilist[api])
          .then(response => {
            return Promise.resolve(response.data.result)
          })
          .catch(error => {
            console.log(error)
          })
      },
      delete: () => {
        let idkeys = apilist[api].match(apiReg)
        if (idkeys) {
          for (let idkey of idkeys) {
            idkey = idkey.substring(1, idkey.length - 1)
            apilist[api] = apilist[api].replace(apiReg, Ids[idkey])
          }
        }
        console.log('api delete:', apilist[api])
        return axios.delete(apilist[api])
          .then(response => {
            return Promise.resolve(response.data.result) // 将response.data.result转成Promise对象
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
  return list
})(Api)

export default Api
