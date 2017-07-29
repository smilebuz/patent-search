<template>
  <div id="container">
    <h1>{{ header }}</h1>
    <main>
      <div id="main">
        <el-form ref='form' :model="form" label-width="80px">
          <el-form-item label='账号:'>
            <el-input v-model='form.account'></el-input>
          </el-form-item>
          <el-form-item label='密码:'>
            <el-input v-model='form.password'></el-input>
          </el-form-item>
          <el-form-item id="operation-group">
            <el-checkbox label="记住密码" name="rememberPw"></el-checkbox>
            <span>忘记密码</span>
            <router-link to="/Register">立即注册</router-link>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div id="contact">
        <div class="contact-item">
          <img src="../assets/telephone.png" alt="电话">
          <div class="contact-detail">
            <p>客服电话:</p>
            <p>{{ contact.phone }}</p>
          </div>
        </div>
        <div class="contact-item">
          <img src="../assets/email.png" alt="邮箱">
          <div class="contact-detail">
            <p>邮箱:</p>
            <p>{{ contact.email }}</p>
          </div>
        </div>
        <div class="contact-item">
          <img src="../assets/address.png" alt="地址">
          <div class="contact-detail">
            <p>{{ company }}</p>
            <p>{{ contact.address }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
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
      alert('登录')
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
  main {
    display: flex;
    & > div {
      flex-basis: 50%;
    }
    #main {
      .el-form {
        width: 60%;
        margin: 30px auto;
      }
    }
    #contact {
      display: flex;
      flex-direction: column;
      .contact-item {
        display: flex;
        margin-bottom: 40px;
        img {
          width: 60px;
          height: 60px;
        }
        .contact-detail {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: flex-start;
          margin-left: 20px;
          p {
            margin: 0;
          }
        }
      }
    }
  }
</style>
