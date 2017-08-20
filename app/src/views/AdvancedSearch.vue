<template lang="html">
  <div class="">
    <myHeader></myHeader>
    <el-checkbox-group v-model='patentType'>
      <el-checkbox label='发明专利'></el-checkbox>
      <el-checkbox label='实用新型专利'></el-checkbox>
      <el-checkbox label='外观专利'></el-checkbox>
    </el-checkbox-group>
    <div class="form-container">
      <el-form ref='form' :model='form' label-width='90px'>
        <el-form-item label='申请号: '>
          <el-input v-model='form.number' size='small'></el-input>
        </el-form-item>
        <el-form-item label='关键词: '>
          <el-input v-model='form.keyword' size='small'></el-input>
        </el-form-item>
        <el-form-item label='发明名称: '>
          <el-input v-model='form.number' size='small'></el-input>
        </el-form-item>
        <el-form-item label='分类号: '>
          <el-input v-model='form.IPC' size='small'></el-input>
        </el-form-item>
        <el-form-item label='申请人: '>
          <el-input v-model='form.proposer' size='small'></el-input>
        </el-form-item>
        <el-form-item label='发明人: '>
          <el-input v-model='form.inventor' size='small'></el-input>
        </el-form-item>
        <el-form-item label='地址: '>
          <el-input v-model='form.address' size='small'></el-input>
        </el-form-item>
        <el-form-item label='国省代码: '>
          <el-input v-model='form.province' size='small'></el-input>
        </el-form-item>
        <el-form-item label='代理人: '>
          <el-input v-model='form.agent' size='small'></el-input>
        </el-form-item>
        <el-form-item label='代理机构: '>
          <el-input v-model='form.agency' size='small'></el-input>
        </el-form-item>
        <el-form-item label='权利要求书: '>
          <el-input v-model='form.claim' size='small'></el-input>
        </el-form-item>
        <el-form-item label='说明书: '>
          <el-input v-model='form.specification' size='small'></el-input>
        </el-form-item>
        <el-form-item label='注册资金: '>
          <el-input v-model='form.fund' size='small'>
            <el-select slot='prepend' v-model='form.fundRelation' size='small'>
              <el-option v-for='item in form.relations' :key='item.value' :label='item.label' :value='item.value'></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label='营业收入: '>
          <el-input v-model='form.revenue' size='small'>
            <el-select slot='prepend' v-model='form.revenueRelation'>
              <el-option v-for='item in form.relations' :key='item.value' :label='item.label' :value='item.value'></el-option>
            </el-select>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="filter-container">
      <div class="filter">
        AND
      </div>
      <div class="filter">
        OR
      </div>
      <div class="filter">
        NOT
      </div>
      <div class="filter">
        ()
      </div>
    </div>
    <div class="formula-container">
      <el-input type='textarea' :rows='3' v-model='formula'>
      </el-input>
      <el-button type="button">生成检索式</el-button>
      <el-button type="button">检索</el-button>
    </div>
  </div>
</template>

<script>
import myHeader from '../components/Header'

export default {
  data () {
    return {
      patentType: [],
      form: {
        number: '',
        keyword: '',
        name: '',
        IPC: '',
        proposer: '',
        inventor: '',
        address: '',
        province: '',
        agent: '',
        agency: '',
        claim: '',
        specification: '',
        fund: '',
        revenue: '',
        fundRelation: '',
        revenueRelation: '',
        relations: [{
          'value': 'more',
          'label': '>'
        }, {
          'value': 'less',
          'label': '<'
        }, {
          'value': 'equal',
          'label': '='
        }]
      },
      formula: ''
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
