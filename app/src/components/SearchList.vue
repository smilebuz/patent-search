<template lang="html">
  <div>
    <div v-if="displayType === 'abstract'">
      <div class="select-all">
        <el-checkbox v-model="selectAll">全选</el-checkbox>
      </div>

      <div v-for="(item, index) in patents" :key="index" class="list-item">
        <div>
          <el-checkbox v-model="item.checked" @change="toggleChange(item)"></el-checkbox>
          <span class="link" @click="loadPatentInfo(item.patent_id)">{{ item.invention_title }}</span>
          <span class="degree link" @click="loadDegreeValue(item.patent_id)">价值度:{{ item.value_degree.value }} <i v-for="n in item.value_degree.degree" class="el-icon-star-off"></i> </span>
        </div>
        <div>
          申请人:<span @click="search(item.applicant_name, 'applicant')" class="search-span">{{ item.applicant_name }}</span> 发明人:<span v-for="(inventor, index) in item.inventor_list" :key="index" @click="search(inventor, 'inventor')" class="search-span">{{ inventor }}</span> IPC分类号:<span @click="search(item.ipc_main_classification_no, 'ipc_main_classification')" class="search-span">{{ item.ipc_main_classification_no }}</span>
        </div>
        <div>
          申请日:<span>{{ item.apply_date }}</span> 申请号:<span>{{ item.apply_no }}</span> 公开日:<span>{{ item.publish_date }}</span> 公开号:<span>{{ item.publish_no }}</span>
        </div>
        <div>
          {{ item.abstract_info }}
        </div>
        <div>
          <span class="link" @click="searchApplicant(item.applicant_id)">申请人信息</span> ——
          <span class="link" @click="searchApplicant(item.applicant_id)">申请人购买力</span> ——
          <span class="link" @click="searchApplicant(item.applicant_id)">申请人主营产品</span> ——
          <span class="link" @click="loadPatentInfo(item.patent_id)">相似专利</span> ——
          <span class="link" @click="loadPotentialBuyer(item.patent_id)">潜在买家</span>
        </div>
      </div>
    </div>

    <el-table v-else :data="patents" @selection-change="selectChange" border>
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="publish_no" label="公开号"></el-table-column>
      <el-table-column prop="invention_title" label="专利名称"></el-table-column>
      <el-table-column prop="applicant_name" label="专利权人"></el-table-column>
      <el-table-column prop="inventor_list" label="发明人"></el-table-column>
      <el-table-column prop="apply_date" label="申请日"></el-table-column>
      <el-table-column prop="publish_date" label="公开日"></el-table-column>
    </el-table>

    <!--div>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="sizes, prev, pager, next, jumper" class="pagination"></el-pagination>
    </div-->
  </div>
</template>

<script>
import state from '../state.js'
import bus from '../bus.js'
import { sendRequest } from '../Api'

export default {
  data () {
    return {
      patents: [],
      selectPatents: [],
      selectPatentIds: [],
      selectAll: false
    }
  },
  props: {
    displayType: String
  },
  methods: {
    refreshList: function (patentList) {
      this.patents.splice(0, this.patents.length)
      // this.patents = [...patentList]
      this.patents = JSON.parse(JSON.stringify(patentList)) // 深拷贝
      console.log('QIAN', this.patents[0].inventor_list)
      console.log('QIAN2', state.get('patentList')[0].inventor_list)
      for (let patent of this.patents) {
        patent.inventor_list = patent.inventor_list.join(' ')
        patent.checked = false
      }
      console.log('HOU', this.patents[0].inventor_list)
      console.log('HOU2', state.get('patentList')[0].inventor_list)
    },
    search: function (keyword, field) {
      state.setSearchParams('query', keyword)
      state.setSearchParams('field', field)
      sendRequest.search.post(state.get('searchParams')).then((data) => {
        bus.$emit('search', data)
      })
    },
    loadPatentInfo (patentId) {
      state.set('patent_id', patentId)
      this.$router.push('/PatentInfo')
    },
    loadDegreeValue: function (patentId) {
      state.set('patent_id', patentId)
      this.$router.push('/ValueDegree')
    },
    searchApplicant: function (applicantId) {
      state.set('applicant_id', applicantId)
      this.$router.push('/ApplicantInfo')
    },
    loadPotentialBuyer: function (patentId) {
      state.set('patent_id', patentId)
      this.$router.push('/PotentialBuyer')
    },
    handleSizeChange: function (val) {
      state.set('per_page', val)
    },
    handleCurrentChange: function (val) {
      state.set('page', val)
    },
    selectChange: function (selection) {
      this.selectPatents = selection
    },
    toggleChange: function (patent) {
      if (patent.checked) {
        this.selectPatentIds.push(patent.patent_id)
      } else {
        let index = this.selectPatentIds.findIndex((el, i, arr) => {
          el === patent.patent_id
        })
        this.selectPatentIds.splice(index, 1)
      }
    }
  },
  watch: {
    displayType: function (newArr) {
      this.selectPatentIds.splice(0, this.selectPatentIds.length)
    },
    selectPatents: function (newArr) {
      this.selectPatentIds.splice(0, this.selectPatentIds.length)
      for (let patent of newArr) {
        this.selectPatentIds.push(patent.patent_id)
      }
    },
    selectPatentIds: function (newIds) {
      bus.$emit('updateSelectPatents', newIds)
    },
    selectAll: function (newVal) {
      if (newVal) {
        this.selectPatentIds.splice(0, this.selectPatentIds.length)
        for (let patent of this.patents) {
          patent.checked = true
          this.selectPatentIds.push(patent.patent_id)
        }
      } else {
        this.selectPatentIds.splice(0, this.selectPatentIds.length)
        for (let patent of this.patents) {
          patent.checked = false
        }
      }
    }
  },
  created () {
    bus.$on('updatePatentList', newList => {
      console.log('hahaha')
      this.refreshList(newList)
    })
  },
  mounted () {
    console.log('lalala')
    this.refreshList(state.get('patentList'))
  },
  beforeDestroy () {
    bus.$off('updatePatentList')
  }
}
</script>

<style lang="scss">
  .select-all {
    text-align: left;
    margin-bottom: .5em;
  }
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
