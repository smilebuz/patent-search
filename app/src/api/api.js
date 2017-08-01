const apilist = {

}

function apiFactory () {

}

const api = {}

for (let key in apilist) {
  api[key] = apiFactory(apilist[key])
}

export default api
