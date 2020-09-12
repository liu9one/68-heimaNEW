<template>
  <div class="mystar">
    <new-header>我的收藏</new-header>
    <div class="list">
      <div class="single-item"  v-for="item in myStarList" :key="item.id">
        <div class="info">
          <div class="title">{{item.title}}</div>
          <div class="user">
            <span>{{item.user.nickname}}</span>
            <span>{{item.comments.length}}跟帖</span>
          </div>
        </div>
        <div class="img">
          <img :src="$url(item.cover[0].url) " alt="">
        </div>
      </div>

      <!-- 多张图片  -->
      <!-- <div class="duo-item" v-for="item in myStarList" :key="item.id">
        <div class="info">
          <div class="title">{{item.title}}</div>
          <div class="imgs">
          <img :src="$url( item.cover[0].url) " alt="">
          <img :src="$url( item.cover[1].url) " alt="">
          <img :src="$url( item.cover[2].url) " alt="">
        </div>
          <div class="user">
            <span>{{item.user.nickname}}</span>
            <span>{{item.comments}}跟帖</span>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      myStarList: []
    }
  },
  created () {
    this.getMyStar()
  },
  methods: {
    async getMyStar () {
      const res = await this.$axios.get('/user_star')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.myStarList = data
        console.log(this.myStarList)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.single-item {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  display: flex;
  .info {
    flex: 1;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .user {
      color: #666;
      font-size: 14px;
    }
  }
  .img {
    img {
      width: 120px;
      height: 74px;
      object-fit: cover;
    }
  }
}
.duo-item{
  padding: 10px;
    font-size: 16px;
.imgs{
  display: flex;
  img{
    width: 120px;
    height: 70px;
    object-fit: cover;
    margin: 5px;
  }
  .user{
    font-size: 14px;
    color: #ccc;
  }
}
}
</style>
