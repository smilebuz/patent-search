<template lang="html">
  <div class="">
    <myHeader></myHeader>
    <el-checkbox-group v-model="application_type">
      <el-checkbox v-for="(type, index) in applicationTypes" :key="index" :label="type.value">{{ type.label }}</el-checkbox>
    </el-checkbox-group>
    <div class="form-container">
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="申请号: ">
          <el-input v-model="form.number" size="small"></el-input>
        </el-form-item>
        <el-form-item label="关键词: ">
          <el-input v-model="form.keyword_list" size="small"></el-input>
        </el-form-item>
        <el-form-item label="发明名称: ">
          <el-input v-model="form.invention_title" size="small"></el-input>
        </el-form-item>
        <el-form-item label="分类号: ">
          <el-input v-model="form.ipc_main_classification_no" size="small"></el-input>
        </el-form-item>
        <el-form-item label="申请人: ">
          <el-input v-model="form.applicant" size="small"></el-input>
        </el-form-item>
        <el-form-item label="发明人: ">
          <el-input v-model="form.inventor_list" size="small"></el-input>
        </el-form-item>
        <el-form-item label="地址: ">
          <el-input v-model="form.address" size="small"></el-input>
        </el-form-item>
        <el-form-item label="国省代码: ">
          <el-input v-model="form.province" size="small"></el-input>
        </el-form-item>
        <el-form-item label="代理人: ">
          <el-input v-model="form.agent" size="small"></el-input>
        </el-form-item>
        <el-form-item label="代理机构: ">
          <el-input v-model="form.agency" size="small"></el-input>
        </el-form-item>
        <el-form-item label="权利要求书: ">
          <el-input v-model="form.claim" size="small"></el-input>
        </el-form-item>
        <el-form-item label="说明书: ">
          <el-input v-model="form.description" size="small"></el-input>
        </el-form-item>
        <el-form-item label="注册资金: ">
          <el-input v-model="form.registration_capital" size="small">
            <el-select slot="prepend" placeholder="" v-model="form.fundRelation" class="form-select">
              <el-option v-for="item in form.relations" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="营业收入: ">
          <el-input v-model="form.revenue" size="small">
            <el-select slot="prepend" placeholder="" v-model="form.revenueRelation" class="form-select">
              <el-option v-for="item in form.relations" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="filter-container">
      <div class="filter" v-for="filter in filters" :key="filter.value" @click="addFormulaFilter(filter.value)">
        {{ filter.value }}
      </div>
    </div>
    <div class="formula-container">
      <el-input type="textarea" :rows="3" v-model="formula">
      </el-input>
      <el-button type="button">生成检索式</el-button>
      <el-button type="button" @click="search">检索</el-button>
    </div>
  </div>
</template>

<script>
import myHeader from '../components/Header'

import bus from '../bus.js'
import state from '../state.js'
import { sendRequest } from '../Api'

export default {
  data () {
    return {
      application_type: [],
      applicationTypes: [
        {
          label: '发明专利',
          value: 'inventions'
        },
        {
          label: '实用新型专利',
          value: 'utility_medels'
        },
        {
          label: '外观专利',
          value: 'designs'
        }
      ],
      form: {
        number: '',
        keyword_list: '',
        invention_title: '',
        ipc_main_classification_no: '',
        applicant: '',
        inventor_list: '',
        address: '',
        state_province_code: '',
        agent: '',
        agency: '',
        claim: '',
        description: '',
        registration_capital: '',
        revenue: '',
        fundRelation: '',
        revenueRelation: '',
        relations: [{
          'value': 'greater_than',
          'label': '>'
        }, {
          'value': 'less',
          'label': '<'
        }, {
          'value': 'equal',
          'label': '='
        }]
      },
      filters: [
        {
          value: 'AND'
        },
        {
          value: 'OR'
        },
        {
          value: 'NOT'
        },
        {
          value: '('
        },
        {
          value: ')'
        }
      ],
      formula: ''
    }
  },
  methods: {
    addFormulaFilter (filter) {
      this.formula += (' ' + filter + ' ')
    },
    search () {
      if (this.formula) {
        console.log('检索式内容', this.formula)
        let params = {
          query: this.formula,
          apply_type: '',
          search_type: '',
          field: '',
          session_id: state.get('session_id')
          // per_page: state.get('per_page'),
          // page: state.get('page')
        }
        state.set('searchParams', params)
        sendRequest.search.post(params).then(data => {
          bus.$emit('search', data)
          this.$router.push('Search')
        })
      } else {
        let params = {
          keyword_list: this.form.keyword_list.split(' '),
          invention_title: this.form.invention_title,
          ipc_main_classification_no: this.form.ipc_main_classification_no,
          applicant: this.form.applicant,
          inventor_list: this.form.inventor_list,
          address: this.form.address,
          state_province_code: this.form.state_province_code,
          agent: this.form.agent,
          agency: this.form.agency,
          claim: this.form.claim,
          description: this.form.description,
          registration_capital: {
            capital: parseInt(this.form.registration_capital),
            operator: this.form.fundRelation
          },
          revenue: {
            capital: parseInt(this.form.revenue),
            operator: this.form.revenueRelation
          }
        }
        sendRequest.search.post(params).then(data => {
          bus.$emit('search', data)
          this.$router.push('Search')
        })
      }
    }
  },
  components: {
    myHeader
  }
}
</script>

<style lang="scss">
  @mixin container {
    width: 80%;
  }
  .form-container {
    @include container;
    margin: 20px auto;
    form {
      overflow: auto;
      border: 2px solid #000;
      padding: 5%;
      .el-form-item {
        width: 50%;
        float: left;
        .form-select {
          padding: 0;
          width: 60px;
          text-align: center;
        }
      }
    }
  }
  .filter-container {
    @include container;
    display: flex;
    margin: 10px auto;
    .filter {
      width: 40px;
      height: 40px;
      margin-right: 20px;
      line-height: 40px;
      border: 2px solid #ccc;
      border-radius: 50%;
      cursor: pointer;
      &:first-child {
        margin-left: 50px;
      }
    }
  }
  .formula-container {
    @include container;
    .el-textarea {
      width: 50%;
    }
    .el-button {
      font-weight: 700;
      background-color: #008080;
      border-color: #008080;
      color: #fff;
    }
  }
</style>
