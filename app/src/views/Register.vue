<template>
  <div class="register">
    <div class="formContainer">
      <el-form
        status-icon
        ref="registerForm"
        :rules="rules"
        label-width="90px"
        :model="registerForm">
        <el-form-item label="账号:" prop="username" class="form__item">
          <el-input placeholder="6-20位英文、数字或者常用符号" size="small"
            v-model="registerForm.username">
          </el-input>
        </el-form-item>
        <el-form-item label="工作岗位:" class="form__item">
          <el-select class="form__item-select" placeholder="请选择" size="small"
            v-model="registerForm.job_title">
            <el-option
              v-for="(option, index) in registerForm.post_options"
              :key="index"
              :value="option">{{ option }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码:" prop="password" class="form__item">
          <el-input placeholder="6-20位英文、数字或者常用符号" type="password"
            v-model="registerForm.password"
            size="small">
          </el-input>
        </el-form-item>
        <el-form-item label="工作单位:" class="form__item">
          <el-input v-model="registerForm.work_unit" size="small"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="password_confirm" class="form__item">
          <el-input placeholder="请再次输入密码" type="password"
            v-model="registerForm.password_confirm"
            size="small">
          </el-input>
        </el-form-item>
        <el-form-item label="所属行业:" class="form__item">
          <el-select class="form__item-select" placeholder="请选择" size="small"
            v-model="registerForm.industry">
            <el-option
              v-for="(option, index) in registerForm.industries"
              :key="index"
              :value="option">{{ option }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名:" prop="fullname" class="form__item">
          <el-input v-model="registerForm.fullname" size="small"></el-input>
        </el-form-item>
        <el-form-item label="获知渠道:" class="form__item">
          <el-select class="form__item-select" placeholder="请选择" size="small"
            v-model="registerForm.information_source">
            <el-option
              v-for="(option, index) in registerForm.sources"
              :key="index"
              :value="option">{{ option }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="座机:" class="form__item">
          <el-input v-model="registerForm.land_line_phone_number" size="small"></el-input>
        </el-form-item>
        <el-form-item label="所属地区:" class="form__item">
          <el-input v-model="registerForm.area" size="small"></el-input>
        </el-form-item>
        <el-form-item label="手机:" class="form__item">
          <el-input v-model="registerForm.cell_phone_number" size="small"></el-input>
        </el-form-item>
        <el-form-item label="采购计划:" class="form__item">
          <el-select class="form__item-select" placeholder="请选择" size="small"
            v-model="registerForm.purchase_plan">
            <el-option
              v-for="(option, index) in registerForm.purchase_time"
              :key="index"
              :value="option">{{ option }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="E-mail:" prop="email" class="form__item">
          <el-input v-model="registerForm.email" size="small"></el-input>
        </el-form-item>
        <el-form-item label="地址:" class="form__item">
          <el-input v-model="registerForm.address" size="small"></el-input>
        </el-form-item>
        <!--el-form-item label="" class="form__item form__item-placeholder">
          <el-input size="small"></el-input>
        </el-form-item-->
      </el-form>
      <div class="buttons">      
        <el-button type="button" class="button-register button" @click="submitRegisterParams('registerForm')">注册</el-button>
        <el-button type="button" class="button-tiral button">申请试用</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { sendRequest } from '../Api'

export default {
  data () {
    var validatorPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error('请输入6-20位英文、数字或者常用符号'))
      } else {
        if (this.registerForm.password_confirm !== '') {
          this.$refs['registerForm'].validateField('password_confirm')
        }
        callback()
      }
    }
    var validatePwConfirm = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        password: '',
        fullname: '',
        cell_phone_number: '',
        landline_phone_number: '',
        email: '',
        address: '',
        job_title: '',
        work_unit: '',
        industry: '',
        information_source: '',
        area: '',
        password_confirm: '',
        post_options: ['总经理', '总监', '助理'],
        industries: ['建筑建材', '水利水电', '机械机电', '咨询服务'],
        sources: ['互联网', '邮件', '微信', '熟人介绍'],
        purchase_plan: ['一个月内', '三个月内', '六个月內', '无']
      },
      registerParams: {
        username: '',
        password: '',
        fullname: '',
        cell_phone_number: '',
        landline_phone_number: '',
        email: '',
        address: '',
        job_title: '',
        work_unit: '',
        industry: '',
        information_source: '',
        area: '',
        purchase_plan: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号名称', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在6到20个字符', trigger: 'blur' }
        ],
        password: [
          {validator: validatorPassword, trigger: 'blur'}
        ],
        password_confirm: [
          {validator: validatePwConfirm, trigger: 'blur'}
        ],
        fullname: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitRegisterParams: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          for (let prop in this.registerParams) {
            if (this.registerParams.hasOwnProperty(prop)) {
              this.registerParams[prop] = this.form[prop]
            }
          }
          sendRequest.register.post(this.registerParams).then(data => {
            this.$router.push('Login')
          })
        } else {
          this.$message({
            message: '注册信息验证失败',
            type: 'error'
          })
          return false
        }
      })
      // sendRequest.register.post(this.registerParams).then(data => {
      //   if (data) {
      //     this.$message({
      //       message: '注册成功',
      //       type: 'success'
      //     })
      //     this.$router.push('Login')
      //   }
      // })
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
    margin: 0 auto;
    margin-bottom: 20px;
    float: left;
    flex-basis: 40%;
    &:nth-child(2n+1) {
      margin-right: 0;
    }
    &:nth-child(2n) {
      margin-left: 0;
    }
  }
  .form__item-placeholder {
    visibility: hidden;
  }
  .form__item-select {
    width: 100%;
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
