<template lang="html">
  <div class="advancedSearch">
    <!-- <el-checkbox-group v-model="application_type" class="checkboxgroup">
      <el-checkbox
        v-for="(type, index) in applicationTypes"
        :key="index"
        :label="type.value"
        >{{ type.label }}
      </el-checkbox>
    </el-checkbox-group> -->
    <div class="formContainer">
      <el-form ref="form" :model="form" label-width="90px">
        <div class="form-row">
          <div class="form-item">
            <span class="form-item-label" @click="addFormulaQuery('申请号: ', form.number)">申请号: </span>
            <el-input v-model="form.number" size="small"></el-input>
          </div>
          <div class="form-item">
            <span class="form-item-label" @click="addFormulaQuery('关键词: ', form.keyword_list)">关键词: </span>
            <el-input v-model="form.keyword_list" size="small"></el-input>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <span class="form-item-label" @click="addFormulaQuery('发明名称: ', form.invention_title)">发明名称: </span>
            <el-input v-model="form.invention_title" size="small"></el-input>
          </div>
          <div class="form-item">
            <span class="form-item-label" @click="addFormulaQuery('分类号: ', form.ipc_main_classification_no)">分类号: </span>
            <el-input v-model="form.ipc_main_classification_no" size="small"></el-input>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <span class="form-item-label" @click="addFormulaQuery('申请人: ', form.applicant)">申请人: </span>
            <el-input v-model="form.applicant" size="small"></el-input>
          </div>
          <div class="form-item">
            <span class="form-item-label" @click="addFormulaQuery('发明人: ', form.inventor_list)">发明人: </span>
            <el-input v-model="form.inventor_list" size="small"></el-input>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <span class="form-item-label" @click="addFormulaQuery('地址: ', form.address)">地址: </span>
            <el-input v-model="form.address" size="small"></el-input>
          </div>
          <div class="form-item">
            <span class="form-item-label" @click="addFormulaQuery('国省代码: ', form.provinces)">国省代码: </span>
            <el-input v-model="form.provinces" size="small"></el-input>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <span class="form-item-label" @click="addFormulaQuery('代理人: ', form.agent)">代理人: </span>
            <el-input v-model="form.agent" size="small"></el-input>
          </div>
          <div class="form-item">
            <span class="form-item-label" @click="addFormulaQuery('代理机构: ', form.agency)">代理机构: </span>
            <el-input v-model="form.agency" size="small"></el-input>
          </div>
        </div>
        <!-- <el-form-item class="form__item">
          <span @click="addFormulaQuery('申请号: ' + form.number)">申请号: </span>
          <el-input v-model="form.number" size="small"></el-input>
        </el-form-item>
        <el-form-item label="关键词: " class="form__item">
          <el-input v-model="form.keyword_list" size="small"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="发明名称: " class="form__item">
          <el-input v-model="form.invention_title" size="small"></el-input>
        </el-form-item>
        <el-form-item label="分类号: " class="form__item">
          <el-input v-model="form.ipc_main_classification_no" size="small"></el-input>
        </el-form-item>
        <el-form-item label="申请人: " class="form__item">
          <el-input v-model="form.applicant" size="small"></el-input>
        </el-form-item>
        <el-form-item label="发明人: " class="form__item">
          <el-input v-model="form.inventor_list" size="small"></el-input>
        </el-form-item>
        <el-form-item label="地址: " class="form__item">
          <el-input v-model="form.address" size="small"></el-input>
        </el-form-item>
        <el-form-item label="国省代码: " class="form__item">
          <el-input v-model="form.province" size="small"></el-input>
        </el-form-item>
        <el-form-item label="代理人: " class="form__item">
          <el-input v-model="form.agent" size="small"></el-input>
        </el-form-item>
        <el-form-item label="代理机构: " class="form__item">
          <el-input v-model="form.agency" size="small"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="权利要求书: " class="form__item">
          <el-input v-model="form.claim" size="small"></el-input>
        </el-form-item>
        <el-form-item label="说明书: " class="form__item">
          <el-input v-model="form.description" size="small"></el-input>
        </el-form-item>
        <el-form-item label="注册资金: " class="form__item">
          <el-input v-model="form.registration_capital" size="small">
            <el-select slot="prepend" placeholder="" v-model="form.fundRelation" class="form-select">
              <el-option v-for="item in form.relations" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="营业收入: " class="form__item">
          <el-input v-model="form.revenue" size="small">
            <el-select slot="prepend" placeholder="" v-model="form.revenueRelation" class="form-select">
              <el-option v-for="item in form.relations" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-input>
        </el-form-item> -->
      </el-form>
      <div class="operator-container">
        <div class="operator"
          v-for="operator in operators"
          :key="operator.value"
          @click="addFormulaOperator(operator.value)"
          >{{ operator.value }}
        </div>
      </div>
      <el-input class="formula__input"
        type="textarea"
        :rows="3"
        v-model="formula">
      </el-input>
      <div class="buttons">      
        <!-- <el-button type="button" class="button-generate button">生成检索式</el-button> -->
        <el-button type="button" @click="search" class="button-search button">检索</el-button>
      </div>
    </div>
    <div class="tips">
      <span class="tips__title">注意:</span>
      <span>申请(专利)号、公开(公告)号前不用加“ZL”或“CN”。</span>
      <span>字段内各检索词之间可进行AND、OR、NOT运算，使用时AND、OR、NOT必须大写。字段内各检索词如以空格间隔，默认为AND关系。</span>
    </div>
  </div>
</template>

<script>
import state from '../state/searchResult/state.js'

require('../assets/scss/advanced-search.scss')

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
      operators: [
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
    addFormulaQuery (key, value) {
      if (!value) {
        this.$message({
          message: '请输入检索值',
          type: 'warning'
        })
        return
      } else {
        let query = key + value
        this.formula += query + ' '
      }
    },
    addFormulaOperator (operator) {
      this.formula += operator + ' '
    },
    search () {
      if (this.formula) {
        console.log('检索式内容', this.formula)
        state.setSearchParams('search_mode', 'user_input')
        state.setSearchParams('search_type', 'advanced')
        state.setSearchParams('field', 'expression')
        state.setSearchParams('query', this.formula)
        state.setSearchParams('per_page', 10)
        state.setSearchParams('page', 1)
        this.$router.push('/SearchResult')
      } else {
        this.$message({
          message: '请输入检索式',
          type: 'warning'
        })
        return
      }
    }
  }
}
</script>

<style lang="scss">
</style>
