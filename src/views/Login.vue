<template>
  <div class="login">
    <new-header>登录</new-header>
    <new-logo></new-logo>
    <van-form @submit="login">
  <van-field
    v-model="username"
    label="用户名/手机"
    placeholder="用户名/手机号"
    :rules=rules.username
  />
  <van-field
    v-model="password"
    type="password"
    label= '密 码'
    placeholder="密码"
    :rules=rules.password
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">
      登录
    </van-button>
  </div>
<div class="tips"><p>还没有账号, 去<router-link to="/register">注册</router-link></p></div>
</van-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {

  methods: {
    async login() {
      const res = await axios.post('/login', {
        username: this.username,
        password: this.password
      })
      console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.$router.push('/user')
      } else {
        this.$toast.fail(message)
      }
    }
  },
  data() {
    return {
      username: '',
      password: '',
      rules: {
        password: [
          { required: true, message: '请填写密码', trigger: 'onChange' },
          { pattern: /^\d{3,9}$/, message: '密码必须是3-9位数字', trigger: 'onChange' }
        ],
        username: [
          { required: true, message: '请填写用户名', trigger: 'onChange' },
          { pattern: /^\d{5,11}$/, message: '输入的用户名必须是5-11位数字 ', trigger: 'onChange' }
        ]
      }
    }
  }
}
</script>

<style lang='less'>
.tips{
  padding: 16px;
  text-align: right;
  font-size: 16px;
  a{
    color: rgb(56, 102, 240);
  }
}
</style>
