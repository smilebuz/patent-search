<template lang="html">
  <div>
    <div v-if='displayType === "abstract"'>
      <div v-for='item, index in patents' :key='index' class='list-item'>
        <div>
          <router-link v-bind:to="'PatentInfo/'+item.patent_id" tag='span'>{{ item.invention_title }}</router-link>
          <span class="degree">价值度:{{ item.value_degree.value }} <i v-for='n in item.value_degree.degree' class='el-icon-star-off'></i> </span>
        </div>
        <div>
          申请人:<span>{{ item.applicant_name }}</span> 发明人:<span v-for='inventor, index in item.inventor_list' :key='index'>{{ inventor }} </span> IPC分类号:<span>{{ item.ipc_main_classification }}</span>
        </div>
        <div>
          申请日:<span>{{ item.apply_date }}</span> 申请号:<span>{{ item.apply_no }}</span> 公开日:<span>{{ item.publish_date }}</span> 公开号:<span>{{ item.publish_no }}</span>
        </div>
        <div>
          {{ item.abstract }}
        </div>
        <div>
          <router-link to='home' tag='span'>申请人信息</router-link> ——
          <router-link to='home' tag='span'>申请人购买力</router-link> ——
          <router-link to='home' tag='span'>申请人主营产品</router-link> ——
          <router-link to='home' tag='span'>相似专利</router-link> ——
          <router-link to='home' tag='span'>潜在买家</router-link>
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
  </div>
</template>

<script>
import state from '../state.js'

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
    fillList: function (patentList) {
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
          value_degree: patent.value_degreee
        })
      }
    }
  },
  mounted () {
    this.fillList(state.get('patentList'))
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
    }
  }
</style>
