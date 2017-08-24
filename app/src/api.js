// import Vue from 'Vue'
import axios from 'axios'
import bus from './bus.js'

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

  'getFavor': '/api//users/{userId}/favorites?per_page=4&page=1', // get
  'createFavor': '/api/users/{userId}/favorites', // post
  'deleteFavorMenu': '/api/users/{userId}/favorites/{favoriteId}', // delete
  'deleteFavor': '/api/users/{userId}/favorites/{favoriteId}/patents/{patentId}', // delete
  'addFavor': '/api/users/{userId}/favorites/{favoriteId}/patents/{patentId}' // put

}

export let patentId = ''
export let applicantId = ''
export let userId = ''

bus.$on('setPatentId', (newId) => {
  patentId = newId
})

bus.$on('setApplicantId', (newId) => {
  applicantId = newId
})

bus.$on('setUserId', (newId) => {
  userId = newId
})

export const sendRequest = ((apilist) => {
  let list = {}

  for (let api in apilist) {
    list[api] = {
      post: params => {
        if (apilist[api].includes('{patentId}')) {
          console.log('patentId', patentId)
          apilist[api] = apilist[api].replace('{patentId}', patentId)
        }
        if (apilist[api].includes('{applicantId}')) {
          apilist[api] = apilist[api].replace('{applicantId}', applicantId)
        }
        if (apilist[api].includes('{userId}')) {
          apilist[api] = apilist[api].replace('{userId}', userId)
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
        if (apilist[api].includes('{patentId}')) {
          apilist[api] = apilist[api].replace('{patentId}', patentId)
        }
        if (apilist[api].includes('{applicantId}')) {
          apilist[api] = apilist[api].replace('{applicantId}', applicantId)
        }
        if (apilist[api].includes('{userId}')) {
          apilist[api] = apilist[api].replace('{userId}', userId)
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
      },
      put: () => {
        return axios.put(apilist[api])
          .then(response => {
            return Promise.resolve(response.data.result)
          })
          .catch(error => {
            console.log(error)
          })
      },
      delete: () => {
        return axios.delete(apilist[api])
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
