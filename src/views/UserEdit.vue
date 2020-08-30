<template>
  <div class="user-edit">
    <new-header>编辑资料</new-header>
    <div class="avatar">
        <img :src="$axios.defaults.baseURL + user.head_img" alt="">
    </div>
    <nav-item @click='showNickname'>
        <template>昵称</template>
        <template #content>{{user.nickname}}</template>
    </nav-item>
    <nav-item @click="showPassword">
        <template>密码</template>
        <template #content>******</template>
    </nav-item>
    <nav-item @click='showGender'>
        <template>性别</template>
        <template #content>{{user.gender ===1 ? '男' : '女'}}</template>
    </nav-item>

    <!-- 渲染组件 -->
    <van-dialog v-model="isshowNickname" title="修改昵称" @confirm='upateNickname' show-cancel-button>
         <van-field v-model="nickname"  placeholder="请输入用户名" />
</van-dialog>
    <van-dialog v-model="isshowPassword" title="修改密码" @confirm='upatePassword' show-cancel-button>
         <van-field v-model="password"  placeholder="请输入用户名" />
</van-dialog>
<van-dialog v-model="isshowGender" title="修改性别" @confirm='updateGender' show-cancel-button>
    <van-radio-group v-model="gender">
  <van-cell-group>
    <van-cell title="男" clickable @click="gender = 1">
      <template #right-icon>
        <van-radio :name="1" />
      </template>
    </van-cell>
    <van-cell title="女" clickable @click="gender = 0">
      <template #right-icon>
        <van-radio :name="0" />
      </template>
    </van-cell>
  </van-cell-group>
</van-radio-group>
</van-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: '',
      isshowNickname: false,
      nickname: '',
      isshowPassword: false,
      password: '',
      isshowGender: false,
      gender: 1
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
      }
    },
    async updateUser (data) {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      console.log(res)
      if (res.data.statusCode === 200) {
        this.getUserInfo()
        this.$toast.success('修改成功')
      }
    },
    showNickname () {
      this.isshowNickname = true
      this.nickname = this.user.nickname
    },
    upateNickname () {
      this.updateUser({ nickname: this.nickname })
    },
    showPassword () {
      this.password = this.user.password
      this.isshowPassword = true
    },
    upatePassword () {
      this.updateUser({ password: this.password })
    },
    showGender() {
      this.gender = this.user.gender
      this.isshowGender = true
    },
    updateGender() {
      this.updateUser({ gender: this.gender })
    }
  }
}
</script>

<style lang='less' scoped>
.avatar {
  padding: 40px 0;
  text-align: center;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
}
/deep/ .van-dialog__content{
      padding: 10px;
      .van-field{
          border: 1px solid #ccc;
      }
  }
</style>
