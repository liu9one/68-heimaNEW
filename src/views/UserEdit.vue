<template>
  <div class="user-edit">
    <new-header>编辑资料</new-header>
    <div class="avatar">
        <img :src="$axios.defaults.baseURL + user.head_img" alt="">
        <van-uploader :after-read="afterRead" />
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
         <van-field ref='nickname' v-model="nickname"  placeholder="请输入用户名" />
</van-dialog>
    <van-dialog v-model="isshowPassword" title="修改密码" @confirm='upatePassword' show-cancel-button>
         <van-field ref='password' v-model="password"  placeholder="请输入用户名" />
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
<!-- 裁剪  -->
<div class="mask" v-show="isshowMask">
  <van-button type="primary" class="crop" @click="crop">裁剪</van-button>
      <van-button type="danger" class="cancel" @click="isShowMask = false">取消</van-button>
  <vueCropper
  ref="cropper"
  :img="img"
  autoCropWidth='200px'
  autoCropHeight='200px'
  :autoCrop ='true'
  fixed
></vueCropper>
</div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data () {
    return {
      user: '',
      isshowNickname: false,
      nickname: '',
      isshowPassword: false,
      password: '',
      isshowGender: false,
      gender: 1,
      isshowMask: false,
      img: ''
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
    async showNickname () {
      this.isshowNickname = true
      this.nickname = this.user.nickname
      await this.$nextTick
      this.$refs.nickname.focus()
    },
    upateNickname () {
      this.updateUser({ nickname: this.nickname })
    },
    async showPassword () {
      this.password = this.user.password
      this.isshowPassword = true
      await this.$nextTick
      this.$refs.password.focus()
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
    },
    isImg (name) {
      if (name.endsWith('jpg') || name.endsWith('png') || name.endsWith('jpeg') || name.endsWith('gif')) {
        return true
      } else {
        return false
      }
    },
    async afterRead(file) {
      if (!this.isImg(file.file.name)) {
        return this.$toast('图片格式不正确')
      }
      if (file.file.size > 500 * 1024) {
        return this.$toast('图片内容过大')
      }
      this.isshowMask = true
      this.img = file.content
    },
    crop () {
      try {
        this.$refs.cropper.getCropBlob(async (blob) => {
          console.log(blob)
          const fd = new FormData()
          fd.append('file', blob)
          const res = await this.$axios.post('/upload', fd)
          const { statusCode, data } = res.data
          if (statusCode === 200) {
            // this.$toast.success('修改成功')
            this.updateUser({ head_img: data.url })
            this.isshowMask = false
          }
        })
      } catch {
        this.$toast('取消修改')
      }
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
  .van-uploader {
    position: absolute;
    left: 50%;
    top: 90px;
    transform: translate(-50%);
    width: 100px;
    height: 100px;
    opacity: 0;
    // background-color: #ff1100;
  }
}
/deep/ .van-dialog__content{
      padding: 10px;
      .van-field{
          border: 1px solid #ccc;
      }
  }
  .mask {
  width: 100%;
  height: 100%;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  .crop,
  .cancel {
    position: fixed;
    top: 0;
    z-index: 1;
  }

  .cancel {
    right: 0;
  }
}
</style>
