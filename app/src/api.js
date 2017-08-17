// import Vue from 'Vue'

const Api = {
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

  'recentSearch': '/version/users/user_id/recent_queries' // get
}

export default Api
