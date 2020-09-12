<template>
  <div class="hm-comment">
      <div class="header">
          <div class="avatar">
              <img :src="$baseUrl + post.user.head_img" alt="">
          </div>
          <div class="user">
              <p>{{post.user.nickname}}</p>
              <p class="time">{{post.create_date | timeNow }}</p>
          </div>
          <div class="right" @click="reply">
              回复
          </div>
      </div>
      <hm-floor :count='count'  :post ='post.parent' v-if="post.parent"></hm-floor>
      <div class="content">
          {{post.content}}
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: this.getCount(0, this.post)
    }
  },
  props: {
    post: Object
  },
  methods: {
    getCount (num, data) {
      if (data.parent) {
        return this.getCount(num + 1, data.parent)
      } else {
        return num
      }
    },
    reply () {
      console.log(this.post.id, this.post.user.nickname)
      this.$bus.$emit('reply', this.post.id, this.post.user.nickname)
    }
  }
}
</script>

<style lang='less' scoped>
.hm-comment{
    padding: 10px;
    border-bottom: 1px solid #ccc;
}
.header{
    display: flex;
    height: 70px;
    padding: 10px;
    font-size: 16px;
    .avatar{
        img{
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 50%;
        }
    }
    .user{
        flex: 1;
        margin-left: 10px;
        font-size: 14px;
        .time{
            color: #666;
        }
    }
    .right{
        font-size: 14px;
    }
}
.content{
    font-size: 16px;
    padding: 10px;
}
</style>
