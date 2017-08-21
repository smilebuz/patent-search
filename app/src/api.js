// import Vue from 'Vue'
import axios from 'axios'
import bus from './bus.js'

export const Api = {
  'login': '/api/users/login', // post
  'logout': '/api/users/logout', // get
  'register': '/api/users/register', // post

  'search': '/api/search', // post
  'filter': '/api/filter', // post
  'sort': '/api/sort', // post

  'patentInfo': '/api/patents/patent_id', // get
  'similarPatent': '/api/patents/patent_id/similarities?perPage=5&page=1', // get
  'organization': '/api/organizations/organization_id', // get
  'legatStatus': '/api/patents/patent_id/legal_statuses', // get

  'recentSearch': 'api/users/user_id/recent_queries' // get
}

bus.$on('setToken', (newToken) => {
  Api.logout = Api.logout + '/?access_token=' + newToken
  Api.search = Api.search + '/?access_token=' + newToken
  Api.filter = Api.filter + '/?access_token=' + newToken
  Api.sort = Api.sort + '/?access_token=' + newToken
})

export const sendRequest = ((apilist) => {
  let list = {}

  for (let api in apilist) {
    list[api] = {
      post: params => {
        return axios.post(apilist[api], params)
                .then(response => {
                  console.log('api:', apilist[api])
                  return Promise.resolve(response.data.result) // 将response.data.result转成Promise对象
                })
                .catch(error => {
                  console.log(error)
                })
      },
      get: params => {
        return axios.get(apilist[api], params)
                .then(response => {
                  return Promise.resolve(response.data.result)
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
