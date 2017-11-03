<template>
  <div class="register">
    <div class="formContainer">
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="账号:" prop="account" class="form__item">
          <el-input v-model="form.account" placeholder="6-20位英文、数字或者常用符号" size="small"></el-input>
        </el-form-item>
        <el-form-item label="工作岗位:" class="form__item">
          <el-select v-model="form.post" placeholder="请选择" size="small">
            <el-option
              v-for="(option, index) in form.post_options"
              :key="index"
              :value="option">{{ option }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码:" prop="password" class="form__item">
          <el-input placeholder="6-20位英文、数字或者常用符号" type="password"
            v-model="form.password"
            size="small">
          </el-input>
        </el-form-item>
        <el-form-item label="工作单位:" class="form__item">
          <el-input v-model="form.organization" size="small"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="password_confirm" class="form__item">
          <el-input placeholder="请再次输入密码" type="password"
            v-model="form.password_confirm"
            size="small">
          </el-input>
        </el-form-item>
        <el-form-item label="所属行业:" class="form__item">
          <el-select v-model="form.industry" placeholder="请选择" size="small">
            <el-option v-for="(option, index) in form.industries" :key="index" :value="option">{{ option }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名:" prop="name" class="form__item">
          <el-input v-model="form.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="获知渠道:" class="form__item">
          <el-select v-model="form.source" placeholder="请选择" size="small">
            <el-option v-for="(option, index) in form.sources" :key="index" :value="option">{{ option }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="座机:" class="form__item">
          <el-input v-model="form.telephone" size="small"></el-input>
        </el-form-item>
        <el-form-item label="所属地区:" class="form__item">
          <el-input v-model="form.district" size="small"></el-input>
        </el-form-item>
        <el-form-item label="手机:" class="form__item">
          <el-input v-model="form.mobile" size="small"></el-input>
        </el-form-item>
        <el-form-item label="采购计划:" class="form__item">
          <el-select v-model="form.purchase" placeholder="请选择" size="small">
            <el-option v-for="(option, index) in form.purchase_time" :key="index" :value="option">{{ option }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="E-mail:" prop="email" class="form__item">
          <el-input v-model="form.email" size="small"></el-input>
        </el-form-item>
        <el-form-item label="地址:" class="form__item">
          <el-input v-model="form.address" size="small"></el-input>
        </el-form-item>
      </el-form>
      <div class="buttons">      
        <el-button type="button" class="button-register button" @click="submitRegisterParams">注册</el-button>
        <el-button type="button" class="button-tiral button">申请试用</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import sendRequest from '../Api'

export default {
  name: 'Register',
  data: () => {
    return {
      header: 'INNOPRO专利精准推荐系统',
      form: {
        account: '',
        password: '',
        password_confirm: '',
        name: '',
        telephone: '',
        mobile: '',
        email: '',
        address: '',
        post: '',
        post_options: ['总经理', '总监', '助理'],
        organization: '',
        industry: '',
        industries: ['建筑建材', '水利水电', '机械机电', '咨询服务'],
        source: '',
        sources: ['互联网', '邮件', '微信', '熟人介绍'],
        district: '',
        purchase: '',
        purchase_time: ['一个月内', '三个月内', '六个月內', '无']
      },
      rules: {
        account: [
          { required: true, message: '请输入账号名称', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在6到20个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在6到20个字符', trigger: 'blur' }
        ],
        password_confirm: [
          { required: true, message: '请再次输入密码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register: function () {
      let params = {
        username: this.form.account,
        password: this.form.password,
        fullname: this.form.name,
        landline_phone_number: this.form.telephone,
        cell_phone_number: this.form.mobile,
        email: this.form.email,
        address: this.form.address,
        job_title: this.form.post,
        work_unit: this.form.organization,
        industry: this.form.industry,
        information_source: this.form.source,
        area: this.form.district,
        purchase_plan: this.form.purchase
      }
      sendRequest.register.post(params).then(res => {
        this.$router.push('Login')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .formContainer {
    display: flex;
    flex-direction: column;
    margin: 60px auto;
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
  .buttons {
    margin-top: 10px;
    padding-bottom: 5%;
    text-align: center;
    border: 1px solid #fff;
    .button {
      border-radius: 2px;
      color: #fff;
    }
    .button-register {
      border-color: #51b2b0;
      background: #51b2b0;
    }
    .button-tiral {
      border-color: #46b6e9;
      background: #46b6e9;
    }
  }
</style>
