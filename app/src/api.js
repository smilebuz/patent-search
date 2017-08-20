// import Vue from 'Vue'
import axios from 'axios'
// import state from './state.js'

const Api = {
  'login': '/api/users/login', // post
  'logout': '/api/users/logout', // get
  'register': '/api/users/register', // post

  'search': '/api/search/?', // post
  'filter': '/api/filter?', // post
  'sort': '/api/sort?', // post

  'patentInfo': '/api/patents/patent_id', // get
  'similarPatent': '/api/patents/patent_id/similarities?perPage=5&page=1', // get
  'organization': '/api/organizations/organization_id', // get
  'legatStatus': '/api/patents/patent_id/legal_statuses', // get

  'recentSearch': 'api/users/user_id/recent_queries' // get
}

export const sendRequest = ((apilist) => {
  let list = {}

  for (let api in apilist) {
    list[api] = {
      post: params => {
        return axios.post(apilist[api], params)
                .then(response => {
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
