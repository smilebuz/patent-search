// import Vue from 'Vue'
import axios from 'axios'

import { Message } from 'element-ui'

export const Api = {
  'login': '/api/login', // post
  'logout': '/api/logout', // post
  'register': '/api/register', // post

  'search': '/api/search', // get
  'filter': '/api/filter', // post
  'sort': '/api/sort', // post

  'patentInfo': '/api/patents/{patentId}', // get
  'legalStatus': '/api/patents/{patentId}/legal_statuses', // get
  'similarPatent': '/api/patents/{patentId}/similarities', // get
  'potentialBuyer': '/api/patents/{patentId}/potential_buyers', // get
  'applicant': '/api/applicants/{applicantId}', // get 申请人信息
  'valuedegree': '/api/patents/{patentId}/values', // get 价值度

  'recentSearch': '/api/recent_queries', // get 最近搜索
  'userPatent': '/api/users/{userId}/applicants?per_page=3&page=1', // get

  // 收藏api
  'getAllFavor': '/api/favorites', // get 获取用户所有收藏夹
  'getFavorInfo': '/api/favorites/{favorId}', // get 获取单个收藏夹信息
  'addFavor': '/api/favorites/{favorId}/patents/{patentId}', // put 添加单个专利至收藏夹
  'addFavors': '/api/favorites/{favorId}/patents', // put 批次添加专利至收藏夹
  'deleteFavorPatent': '/api/favorites/{favorId}/patents/{patentId}', // delete 从收藏夹删除某个专利
  'deleteFavor': '/api/favorites/{favorId}', // delete 删除收藏夹
  'createFavor': '/api/favorites', // post 创建收藏夹

  // 分类导航
  'categoryNav': '/api/ipcs' // get 获取分类导航信息
}

export const sendRequest = ((apilist) => {
  let list = {}
  let apiReg = /({[a-zA-Z]+})/g // ?先行匹配有问题 只能用后行匹配 但是拿到userId怎么替换掉大括号{}

  for (let api in apilist) {
    list[api] = {
      post: params => {
        /*
        let idkeys = apilist[api].match(apiReg)
        if (idkeys) {
          for (let idkey of idkeys) {
            apilist[api] = apilist[api].replace(idkey, state.get(idkey.substring(1, idkey.length - 1)))
          }
        }
        */
        console.log('api post:', apilist[api])
        return axios.post(apilist[api], params)
          .then(response => {
            if (response.data.error_code) {
              // 报错
              if (response.data.error_msg) {
                Message({
                  message: response.data.error_msg,
                  type: 'warning'
                })
              }
              return Promise.reject(new Error(response.error_msg))
            } else {
              return Promise.resolve(response.data.result) // 将response.data.result转成Promise对象
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      get: (params, ids) => {
        let idkeys = apilist[api].match(apiReg)
        let apiTemp = apilist[api]
        if (idkeys) {
          for (let idkey of idkeys) {
            // apilist[api] = apilist[api].replace(idkey, ids[idkey.substring(1, idkey.length - 1)])
            apiTemp = apilist[api].replace(idkey, ids[idkey.substring(1, idkey.length - 1)])
          }
        }
        console.log('api get:', apiTemp)
        if (params) {
          return axios.get(apiTemp, {params: params})
            .then(response => {
              return Promise.resolve(response.data.result)
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          return axios.get(apiTemp)
            .then(response => {
              return Promise.resolve(response.data.result)
            })
            .catch(error => {
              console.log(error)
            })
        }
      },
      put: (params, ids) => {
        let idkeys = apilist[api].match(apiReg)
        let apiTemp = apilist[api]
        if (idkeys) {
          for (let idkey of idkeys) {
            apiTemp = apilist[api].replace(idkey, ids[idkey.substring(1, idkey.length - 1)])
          }
        }
        console.log('api put:', apiTemp)
        if (params) {
          return axios.put(apiTemp, params)
            .then(response => {
              return Promise.resolve(response.data.result)
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          return axios.put(apiTemp)
            .then(response => {
              return Promise.resolve(response.data.result)
            })
            .catch(error => {
              console.log(error)
            })
        }
      },
      delete: ids => {
        let idkeys = apilist[api].match(apiReg)
        let apiTemp = apilist[api]
        if (idkeys) {
          for (let idkey of idkeys) {
            apiTemp = apilist[api].replace(idkey, ids[idkey.substring(1, idkey.length - 1)])
          }
        }
        console.log('api delete:', apiTemp)
        return axios.delete(apiTemp)
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
