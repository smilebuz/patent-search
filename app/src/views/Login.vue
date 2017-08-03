<template>
  <div id="container">
    <h1>{{ header }}</h1>
    <el-row type='flex' justify='center'>
      <el-col :span='14' id="main">
        <el-form ref='form' :model="form" label-width="80px">
          <el-form-item label='账号:'>
            <el-input v-model='form.account'></el-input>
          </el-form-item>
          <el-form-item label='密码:'>
            <el-input v-model='form.password'></el-input>
          </el-form-item>
          <el-form-item id="operation-group">
            <el-checkbox label="记住密码" name="rememberPw"></el-checkbox>
            <router-link to='' id="forgetpw" tag='span' class="span-link">忘记密码</router-link>
            <router-link to="/Register" tag='span' class="span-link">立即注册</router-link>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span='10' id="contact">
        <el-row class="contact-item">
          <el-col :span='4'>
            <img src="../assets/telephone.png" alt="电话">
          </el-col>
          <el-col :span='20' class="contact-detail">
            <p>客服电话:</p>
            <p>{{ contact.phone }}</p>
          </el-col>
        </el-row>
        <el-row class="contact-item">
          <el-col :span='4'>
            <img src="../assets/email.png" alt="邮箱">
          </el-col>
          <el-col :span='20' class="contact-detail">
            <p>邮箱:</p>
            <p>{{ contact.email }}</p>
          </el-col>
        </el-row>
        <el-row class="contact-item">
          <el-col :span='4'>
            <img src="../assets/address.png" alt="地址">
          </el-col>
          <el-col :span='20' class="contact-detail">
            <p>{{ company }}</p>
            <p>{{ contact.address }}</p>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import state from '../state'

export default {
  name: 'Login',
  data () {
    return {
      header: 'INNOPRO专利精准推荐系统',
      form: {
        account: '',
        password: ''
      },
      contact: {
        phone: '010-68418027',
        email: 'service@innnopro.com',
        address: '北京市海淀区知春路甲48号盈都大厦C座4单元19D'
      },
      company: '北京中科创益科技有限公司'
    }
  },
  methods: {
    login () {
      state.set('isLogin', true)
      alert(state.get('isLogin'))
      this.$router.push('Home')
    }
  }
}
</script>

<style scoped lang="scss">
  #container {
    width: 80%;
    margin: 0 auto;
  }
  $head-color: #00f;
  $head-font: 40px SimSun;
  h1 {
    margin-bottom: 50px;
    color: $head-color;
    font: $head-font;
  }
  #main {
    .el-form {
      width: 60%;
      margin: 30px auto;
    }
  }
  #contact {
    .contact-item {
      display: flex;
      margin-bottom: 40px;
      img {
        height: 60px;
      }
      .contact-detail {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
        p {
          margin: 0;
        }
      }
    }
  }
  .span-link {
    cursor: pointer;
  }
</style>
