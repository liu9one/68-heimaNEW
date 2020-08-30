<template>
  <div>
<new-header>注册</new-header>
<new-logo></new-logo>
 <van-form @submit="register">
  <van-field
    v-model="username"
    label="用户名/手机"
    placeholder="用户名/手机号"
    :rules=rules.username
  />
  <van-field
    v-model="nickname"
    label="昵称"
    placeholder="请输入昵称"
    :rules=rules.nickname
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
<div class="tips"><p>已经有账号了, 去<router-link to="/login">登录</router-link></p></div>
</van-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {

  methods: {
    async register() {
      const res = await axios.post('/register', {
        username: this.username,
        password: this.password,
        nickname: this.nickname
      })
      console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.$router.push({
          name: 'login',
          params: {
            username: this.username,
            password: this.password
          }
        })
      } else {
        this.$toast.fail(message)
      }
    }
  },
  data() {
    return {
      username: '',
      password: '',
      nickname: '',
      rules: {
        password: [
          { required: true, message: '请填写密码', trigger: 'onChange' },
          { pattern: /^\d{3,9}$/, message: '密码必须是3-9位数字', trigger: 'onChange' }
        ],
        nickname: [
          { required: true, message: '昵称不能为空', trigger: 'onChange' },
          { pattern: /^[\u4e00-\u9fa5]{2,6}$/, message: '昵称必须是汉字', trigger: 'onChange' }
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

<style>

</style>
