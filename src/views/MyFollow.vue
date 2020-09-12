<template>
  <div class="my-follow">
      <new-header>我的关注</new-header>
      <div class="item" v-for="item in followList" :key="item.id
      ">
          <div class="avatar">
              <img :src="$baseUrl + item.head_img" alt="">
          </div>
          <div class="info">
              <p class="name">{{item.nickname}}</p>
              <p class="time">{{item.create_date | time}}</p>
          </div>
          <div class="cancel">
              <van-button round size="small" @click="unFollow(item.id)" type="default">取消关注</van-button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      followList: []
    }
  },
  created () {
    this.getFollowList()
  },
  methods: {
    async getFollowList () {
      const res = await this.$axios.get('/user_follows')

      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.followList = data
        console.log(this.followList)
      }
    },
    async unFollow(id) {
      try {
        await this.$dialog.confirm({
          title: '温馨警告',
          message: '您确定要取关吗'
        })
      } catch {
        this.$toast('取消操作')
      }
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast('取关成功')
        this.getFollowList()
      }
    }
  }

}
</script>

<style lang='less' scoped>
.item{
    display: flex;
    padding: 15px;
    border-bottom: 1px solid #ccc;
    align-items: center;
    .avatar{
        width: 60px;
        img{
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
    }
    .cancel{
        width:70px;
    }
    .info{
        flex: 1;
       .name{
           font-size: 18px;
       }
       .time{
           font-size: 14px;
           color: #ccc;

           margin-top: 10px;
       }

    }
}
</style>
