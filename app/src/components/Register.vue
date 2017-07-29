<template>
  <div>
    <h1>{{ header }}</h1>
    <main>
      <el-form ref='form' :model='form' :rules='rules' id="register-form" label-width='100px'>
        <div class="form-part">
          <el-form-item label="账号:" prop='account'>
            <el-input v-model='form.account' placeholder='6-20位英文、数字或者常用符号'></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop='password'>
            <el-input v-model='form.password' placeholder='6-20位英文、数字或者常用符号'></el-input>
          </el-form-item>
          <el-form-item label="确认密码:" prop='password_confirm'>
            <el-input v-model='form.password_confirm'></el-input>
          </el-form-item>
          <el-form-item label="姓名:" prop='name'>
            <el-input v-model='form.name'></el-input>
          </el-form-item>
          <el-form-item label="座机:">
            <el-input v-model='form.telephone'></el-input>
          </el-form-item>
          <el-form-item label="手机:">
            <el-input v-model='form.mobile'></el-input>
          </el-form-item>
          <el-form-item label="E-mail:" prop='email'>
            <el-input v-model='form.email'></el-input>
          </el-form-item>
          <el-form-item label="地址:">
            <el-input v-model='form.address'></el-input>
          </el-form-item>
          <el-form-item id="register-btn-group">
            <el-button type='primary' @click='register' id="register">注册</el-button>
            <el-button type='primary' @click='' id="trial">申请试用</el-button>
          </el-form-item>
        </div>
        <div class="form-part">
          <el-form-item label="工作岗位:">
            <el-select v-model='form.post' placeholder='请选择'>
              <el-option v-for='(option, index) in form.post_options' :key='index' :value='option'>{{ option }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='工作单位:'>
            <el-input v-model='form.organization'></el-input>
          </el-form-item>
          <el-form-item label='所属行业:'>
            <el-select v-model='form.industry' placeholder='请选择'>
              <el-option v-for='(option, index) in form.industries' :key='index' :value='option'>{{ option }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='获知渠道:'>
            <el-select v-model='form.source' placeholder='请选择'>
              <el-option v-for='(option, index) in form.sources' :key='index' :value='option'>{{ option }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='所属地区:'>
            <el-input v-model='form.district'></el-input>
          </el-form-item>
          <el-form-item label='采购计划:'>
            <el-select v-model='form.purchase' placeholder='请选择'>
              <el-option v-for='(option, index) in form.purchase_time' :key='index' :value='option'>{{ option }}</el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
    </main>
  </div>
</template>

<script>
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
    register: (event) => {
      alert('注册完成')
    }
  }
}
</script>

<style lang="scss" scoped>
  $head-color: #00f;
  $head-font: 40px SimSun;
  h1 {
    margin-bottom: 50px;
    color: $head-color;
    font: $head-font;
  }
  #register-form {
    display: flex;
    width: 80%;
    margin: 0 auto;
    .form-part {
      width: 50%;
      .el-form-item__content {
        width: 60%;
        & > .el-select {
          width: 100%;
        }
      }
      #register-btn-group {
        & > .el-form-item__content {
          width: 100%;
          #register {
            position: absolute;
            left: 10%;
          }
          #trial {
            position: absolute;
            right: 25%;
          }
        }
      }
    }
  }
</style>
