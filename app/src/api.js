import Vue from 'Vue';

const Api = {
  'login': '/',

  'search': '/api/version/search', //post
  'filter': '/api/version/filter', //post
  'sort': '/api/version/sort', //post

  'recentSearch': 'api/version/users/{user_id}/recent_queries', //get

  'patentInfo': '/api/version/patents/{patent_id}', //get

  'similarPatent': '/api/version/patents?patent_id=xxx&intent=similarity', //get

  'applicants': '/api/version/applicants/{applicant_id}', //get

  'intentBuyer': '/api/version/applicants?patent_id=xxxx&intent=potential_buyer&per_page=10&page=1', //get

  'patentValue': '/api/version/patents/{patent_id}/values' //get

}
