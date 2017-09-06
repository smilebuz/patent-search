<template>
  <div id="app">
    <!--img src="./assets/logo.png"-->
    <router-view></router-view>
  </div>
</template>

<script>
import bus from './bus.js'
import state from './state.js'

export default {
  name: 'app',
  created () {
    bus.$on('search', data => {
      // window.tempdata = data.patent_list
      // state.set('patentList', data.patent_list)
      bus.$emit('updatePatentList', data.patent_list)
      state.set('filterList', data.filter_sidebar_list)
      state.set('recommendList', data.recommend_list)
      state.set('session_id', data.session_id)
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
