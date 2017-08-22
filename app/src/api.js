// import Vue from 'Vue'
import axios from 'axios'
import bus from './bus.js'

export const Api = {
  'login': '/api/users/login', // post
  'logout': '/api/users/logout/?access_token={token}', // get
  'register': '/api/users/register', // post

  'search': '/api/search/?access_token={token}', // post
  'filter': '/api/filter/?access_token={token}', // post
  'sort': '/api/sort/?access_token={token}', // post

  'patentInfo': '/api/patents/{patentId}', // get
  'similarPatent': '/api/patents/patent_id/similarities?perPage=5&page=1', // get
  'applicant': '/api/organizations/{patentId}', // get
  'valuedegree': '/api/patents',
  'legatStatus': '/api/patents/patent_id/legal_statuses', // get

  'recentSearch': 'api/users/user_id/recent_queries' // get
}

export let token = ''
export let patentId = ''

bus.$on('setToken', function (newToken) {
  token = newToken
})

bus.$on('setPatentId', (newId) => {
  patentId = newId
  Api.valuedegree = Api.valuedegree + '/' + newId + '/values'
})

export const sendRequest = ((apilist) => {
  let list = {}

  for (let api in apilist) {
    list[api] = {
      post: params => {
        if (apilist[api].includes('{token}')) {
          apilist[api] = apilist[api].replace('{token}', token)
        }
        if (apilist[api].includes('{patentId}')) {
          console.log('patentId', patentId)
          apilist[api] = apilist[api].replace('{patentId}', patentId)
        }
        console.log('api:', apilist[api])
        return axios.post(apilist[api], params)
          .then(response => {
            return Promise.resolve(response.data.result) // 将response.data.result转成Promise对象
          })
          .catch(error => {
            console.log(error)
          })
      },
      get: params => {
        if (apilist[api].includes('{token}')) {
          apilist[api] = apilist[api].replace('{token}', token)
        }
        if (apilist[api].includes('{patentId}')) {
          apilist[api] = apilist[api].replace('{patentId}', patentId)
        }
        console.log('api:', apilist[api])
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
      }
    }
  }
  return list
})(Api)

export default Api
