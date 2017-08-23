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
  'similarPatent': '/api/patents/{patentId}/similarities?perPage=5&page=1', // get
  'applicant': '/api/applicants/{applicantId}', // get
  'valuedegree': '/api/patents/{patentId}/values', // get
  'legatStatus': '/api/patents/patent_id/legal_statuses', // get
  'potentialBuyer': '/api/patents/{patentId}/applicants?intent=potential_buyer&per_page=10&page=1', // get

  'recentSearch': 'api/users/user_id/recent_queries' // get
}

export let token = ''
export let patentId = ''
export let applicantId = ''

bus.$on('setToken', function (newToken) {
  token = newToken
})

bus.$on('setPatentId', (newId) => {
  patentId = newId
})

bus.$on('setApplicantId', (newId) => {
  applicantId = newId
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
        if (apilist[api].includes('{applicantId}')) {
          apilist[api] = apilist[api].replace('{applicantId}', applicantId)
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
        if (apilist[api].includes('{applicantId}')) {
          apilist[api] = apilist[api].replace('{applicantId}', applicantId)
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
