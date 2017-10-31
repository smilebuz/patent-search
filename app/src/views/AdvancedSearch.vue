<template lang="html">
  <div class="advancedSearch">
    <el-checkbox-group v-model="application_type" class="checkboxgroup">
      <el-checkbox
        v-for="(type, index) in applicationTypes"
        :key="index"
        :label="type.value"
        >{{ type.label }}
      </el-checkbox>
    </el-checkbox-group>
    <div class="formContainer">
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="申请号: " class="form__item">
          <el-input v-model="form.number" size="small"></el-input>
        </el-form-item>
        <el-form-item label="关键词: " class="form__item">
          <el-input v-model="form.keyword_list" size="small"></el-input>
        </el-form-item>
        <el-form-item label="发明名称: " class="form__item">
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
        </el-form-item>
        <el-form-item label="权利要求书: " class="form__item">
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
        </el-form-item>
      </el-form>
      <div class="operator-container">
        <div class="operator"
          v-for="operator in operators"
          :key="operator.value"
          @click="addFormulaoperator(operator.value)"
          >{{ operator.value }}
        </div>
      </div>
      <el-input class="formula__input"
        type="textarea"
        :rows="3"
        v-model="formula">
      </el-input>
      <div class="buttons">      
        <el-button type="button" class="button-generate button">生成检索式</el-button>
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
    addFormulaoperator (operator) {
      this.formula += (' ' + operator + ' ')
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
  }
}
</script>

<style lang="scss">
  .advancedSearch {
    flex-direction: column;
  }
  .checkboxgroup {
    padding: 20px 0;
    text-align: center;
  }
  .formContainer {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    border: 2px solid #cdcdcd;
    width: 60%;
    form {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      overflow: auto;
      padding: 5%;
      padding-bottom: 0;
      .el-form-item {
        .form-select {
          padding: 0;
          width: 60px;
          text-align: center;
        }
      }
    }
  }
  .form__item {
    margin-bottom: 0;
    float: left;
    flex-basis: 40%;
  }
  .operator-container {
    display: flex;
    margin: 10px auto;
    .operator {
      width: 48px;
      height: 30px;
      margin-right: 20px;
      line-height: 30px;
      border-radius: 2px;
      cursor: pointer;
      text-align: center;
      font-weight: 700;
      color: #fff;
      background: #a0a0a0;
    }
  }
  .formula__input {
    width: 50%;
    margin: 0 auto;
  }
  .buttons {
    margin-top: 10px;
    padding-bottom: 5%;
    text-align: center;
    border: 1px solid #fff;
    .button {
      border-radius: 2px;
      color: #fff;
    }
    .button-generate {
      border-color: #51b2b0;
      background: #51b2b0;
    }
    .button-search {
      border-color: #46b6e9;
      background: #46b6e9;
    }
  }
  .tips {
    display: flex;
    flex-direction: column;
    width: 60%;
    margin: 20px auto;
    color: #848484;
    font-size: 12px;
    font-weight: 700;
    .tips__title {
      color: #ee3d29;
    }
  }
</style>
