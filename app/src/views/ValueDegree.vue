<template lang="html">
  <div>
    <myHeader></myHeader>
    <searchbar></searchbar>
    <el-tabs type="border-card" class="tab" v-model="activeTab">
      <el-tab-pane v-for="tab, index in tabs" :key="index" v-bind:label="tab.message" v-bind:name="tab.value">
        <el-table v-if="activeTab === 'generalValue'" :data="generalTable" border align="left">
          <el-table-column prop="evaluate_item" label="评估项"></el-table-column>
          <el-table-column prop="score" label="得分"></el-table-column>
          <el-table-column prop="mean_score" label="平均分"></el-table-column>
          <el-table-column prop="standard_deviation" label="标准差"></el-table-column>
        </el-table>

        <el-table v-else-if="activeTab === 'lawValue'" :data="lawTable" border align="left">
          <el-table-column prop="evaluate_item" label="评估项"></el-table-column>
          <el-table-column prop="total_score" label="总分值"></el-table-column>
          <el-table-column prop="score" label="得分"></el-table-column>
          <el-table-column prop="mean_score" label="平均分"></el-table-column>
          <el-table-column prop="standard_deviation" label="标准差"></el-table-column>
        </el-table>

        <el-table v-else-if="activeTab === 'tenicalValue'" :data="technicalTable" border align="left">
          <el-table-column prop="evaluate_item" label="评估项"></el-table-column>
          <el-table-column prop="total_score" label="总分值"></el-table-column>
          <el-table-column prop="score" label="得分"></el-table-column>
          <el-table-column prop="mean_score" label="平均分"></el-table-column>
          <el-table-column prop="standard_deviation" label="标准差"></el-table-column>
        </el-table>

        <el-table v-else :data="economyTable" border align="left">
          <el-table-column prop="evaluate_item" label="评估项"></el-table-column>
          <el-table-column prop="total_score" label="总分值"></el-table-column>
          <el-table-column prop="score" label="得分"></el-table-column>
          <el-table-column prop="mean_score" label="平均分"></el-table-column>
          <el-table-column prop="standard_deviation" label="标准差"></el-table-column>
        </el-table>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import myHeader from '../components/Header'
import searchbar from '../components/SearchBar'

import state from '../state/searchResult/state.js'
import { sendRequest } from '../Api'

export default {
  data () {
    return {
      activeTab: 'generalValue',
      tabs: [
        {
          message: '综合价值',
          value: 'generalValue'
        },
        {
          message: '法律价值度',
          value: 'lawValue'
        },
        {
          message: '技术价值度',
          value: 'tenicalValue'
        },
        {
          message: '经济价值度',
          value: 'economyValue'
        }
      ],
      generalTable: [],
      lawTable: [],
      technicalTable: [],
      economyTable: []
    }
  },
  mounted () {
    let ids = {
      patentId: state.get('patentId')
    }
    sendRequest.valuedegree.get(null, ids).then((data) => {
      this.generalTable = [...data.general_value]
      this.lawTable = [...data.law_value]
      this.technicalTable = [...data.technical_value]
      this.economyTable = [...data.economy_value]
    })
  },
  components: {
    myHeader, searchbar
  }
}
</script>

<style lang="scss">
  .tab {
    width: 70%;
    margin: 0 auto;
  }
</style>
