<template lang="html">
  <div>
    <div v-if='displayType === "abstract"'>
      <div v-for='item, index in patents' :key='index' class='list-item'>
        <div>
          <router-link v-bind:to="'PatentInfo/'+item.patent_id" tag='span' class='link'>{{ item.invention_title }}</router-link>
          <router-link v-bind:to="'ValueDegree/'+item.patent_id" tag='span' class="degree link">价值度:{{ item.value_degree.value }} <i v-for='n in item.value_degree.degree' class='el-icon-star-off'></i> </router-link>
        </div>
        <div>
          申请人:<span @click='search(item.applicant_name, "applicant")' class='search-span'>{{ item.applicant_name }}</span> 发明人:<span v-for='inventor, index in item.inventor_list' :key='index' @click='search(inventor, "inventor")' class='search-span'>{{ inventor }} </span @click='search(item.ipc_main_classification, "ipc_main_classification")' class='search-span'> IPC分类号:<span>{{ item.ipc_main_classification }}</span>
        </div>
        <div>
          申请日:<span>{{ item.apply_date }}</span> 申请号:<span>{{ item.apply_no }}</span> 公开日:<span>{{ item.publish_date }}</span> 公开号:<span>{{ item.publish_no }}</span>
        </div>
        <div>
          {{ item.abstract }}
        </div>
        <div>
          <router-link v-bind:to="'ApplicantInfo/'+item.patent_id" tag='span' class='link'>申请人信息</router-link> ——
          <router-link v-bind:to="'ApplicantInfo/'+item.patent_id" tag='span' class='link'>申请人购买力</router-link> ——
          <router-link v-bind:to="'ApplicantInfo/'+item.patent_id" tag='span' class='link'>申请人主营产品</router-link> ——
          <router-link to='home' tag='span' class='link'>相似专利</router-link> ——
          <router-link v-bind:to="'PotentialBuyer/'+item.patent_id" tag='span' class='link'>潜在买家</router-link>
        </div>
      </div>
    </div>

    <el-table v-else :data='patents' border>
      <el-table-column prop='publish_no' label='公开号'></el-table-column>
      <el-table-column prop='invention_title' label='专利名称'></el-table-column>
      <el-table-column prop='applicant_name' label='专利权人'></el-table-column>
      <el-table-column prop='inventor_list' label='发明人'></el-table-column>
      <el-table-column prop='apply_date' label='申请日'></el-table-column>
      <el-table-column prop='publish_date' label='公开日'></el-table-column>
    </el-table>

    <div>
      <el-pagination @size-change='handleSizeChange' @current-change='handleCurrentChange' layout='sizes, prev, pager, next, jumper' class="pagination"></el-pagination>
    </div>
  </div>
</template>

<script>
import state from '../state.js'
import bus from '../bus.js'
import Api from '../Api'

export default {
  data () {
    return {
      patents: []
    }
  },
  props: {
    displayType: String
  },
  methods: {
    refreshList: function () {
      this.patents.splice(0, this.patents.length)
      let patentList = state.get('patentList')
      for (let i = 0; i < patentList.length; i++) {
        let patent = patentList[i]
        this.patents.push({
          patent_id: patent.patent_id,
          invention_title: patent.invention_title,
          applicant_name: patent.applicant_name,
          inventor_list: patent.inventor_list.join(' '),
          ipc_main_classification: patent.ipc_main_classification,
          apply_date: patent.apply_date,
          apply_no: patent.apply_no,
          publish_date: patent.publish_date,
          publish_no: patent.publish_no,
          abstract: patent.abstract_info,
          value_degree: patent.value_degree
        })
      }
    },
    search: function (keyword, field) {
      let params = {
        query: keyword,
        apply_type: 'inventions',
        search_type: 'common',
        field: field,
        session: state.get('session_id'),
        per_page: state.get('per_page'),
        page: state.get('page')
      }
      this.$http.post(Api.search, params)
        .then((response) => {
          bus.$emit('setKeyword', keyword)
          bus.$emit('search', response.data.result)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleSizeChange: function (val) {
      state.set('per_page', val)
    },
    handleCurrentChange: function (val) {
      state.set('page', val)
    }
  },
  created () {
    bus.$on('sort', data => {
      state.set('patentList', data.patent_list)
      this.refreshList()
    })
    bus.$on('filter', data => {
      state.set('patentList', data.patent_list)
      this.refreshList()
    })
    bus.$on('search', data => {
      state.set('patentList', data.patent_list)
      state.set('filterList', data.filter_sidebar_list)
      state.set('recommendList', data.recommend_list)
      state.set('session_id', data.session_id)
      this.refreshList()
    })
  },
  mounted () {
    this.refreshList()
  }
}
</script>

<style lang="scss">
  .list-item {
    margin-bottom: 1em;
    border-bottom: 1px solid #008080;
    text-align: left;
    > div {
      margin-bottom: .5em;
      .search-span {
        cursor: pointer;
      }
      .link {
        cursor: pointer;
      }
    }
  }
  .pagination {
    text-align: right;
  }
</style>
