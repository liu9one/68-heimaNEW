<template>
  <div class="post-detail">
    <div class="header">
      <div class="left" @click="$router.back()">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="right">
        <div class="followed"  @click="unfollow" v-if="post.has_follow">已关注</div>
        <div class="follow" @click="follow" v-else>关注</div>
      </div>
      </div>
      <div class="content">
          <div class="title">
              {{post.title}}
          </div>
          <div class="user">
              <span>{{post.user.nickname}}</span>&nbsp;
              <span>{{post.create_date|time}}</span>
          </div>
          <div class="info" v-if="post.type === 1" v-html="post.content"></div>
          <video :src="post.content" controls muted autoplay v-else></video>
          <div class="btns">
            <div class="dianzan" @click="like" :class="{likeActive: post.has_like}">
                <span class="iconfont icondianzan"></span>&nbsp;
                <span>{{post.like_length}}</span>
            </div>
            <div class="weixin">
                <span class="iconfont iconweixin"></span>
                <span>微信</span>
            </div>
          </div>
      </div>
      <div class="comment">
        <h4>
          精彩回帖
        </h4>
        <hm-comment v-for="comment in commentList " :post='comment' :key="comment.id"></hm-comment>
      </div>
       <div class="footer-text" v-if="isshowTxt">
          <textarea class="txt" v-model="textarea" ref="txt" :placeholder='"回复" + nickname ' ></textarea>
          <van-button type="primary" round @click="publish" >发送</van-button>
      </div>
      <div class="footer" v-else >
        <div class="input">
          <input type="text"  @focus="onFocus" placeholder="回复">
        </div>
        <span class="iconfont iconpinglun-"><i>{{post.comment_length}}</i></span>
        <span class="iconfont iconshoucang" :class="{starActive: post.has_star}" @click="star"></span>
        <span class="iconfont iconlianjie"></span>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      post: {
        user: {}
      },
      commentList: [],
      isshowTxt: false,
      textarea: '',
      replyId: '',
      nickname: ''
    }
  },
  created () {
    this.getPost()
    this.getCommentList()
    this.$bus.$on('reply', (id, nickname) => {
      this.onReply(id, nickname)
    })
  },
  destroyed () {
    this.$bus.$off('reply')
  },
  methods: {
    async getPost () {
      const { id } = this.$route.params
      const res = await this.$axios.get(`/post/${id}`)
      if (res.data.statusCode === 200) {
        this.post = res.data.data
        console.log(this.post)
      }
    },
    async getCommentList () {
      const { id } = this.$route.params
      const res = await this.$axios.get(`/post_comment/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
        console.log(this.commentList)
      }
    },
    // 判断是否登录
    noLogin () {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
        return true
      } else {
        return false
      }
    },
    async follow () {
      if (this.noLogin()) return
      const res = await this.$axios.get(`/user_follows/${this.post.user.id}`)
      if (res.data.statusCode === 200) {
        this.$toast.success('关注成功')
        this.getPost()
      }
    },
    async unfollow () {
      const res = await this.$axios.get(`/user_unfollow/${this.post.user.id}`)
      if (res.data.statusCode === 200) {
        this.$toast.success('已取关')
        this.getPost()
      }
    },
    async like () {
      if (this.noLogin()) return
      const res = await this.$axios.get(`/post_like/${this.post.id}`)
      if (res.data.statusCode === 200) {
        this.$toast.success('点赞成功')
        this.getPost()
      }
    },
    async star () {
      if (this.noLogin()) return
      const res = await this.$axios.get(`/post_star/${this.post.id}`)
      if (res.data.statusCode === 200) {
        this.$toast.success('收藏完成')
        this.getPost()
      }
    },
    async onFocus () {
      this.isshowTxt = true
      await this.$nextTick()
      this.$refs.txt.focus()
    },
    async publish () {
      if (this.textarea.trim() === '') return this.$toast('请输入内容')
      const res = await this.$axios.post(`/post_comment/${this.post.id}`, {
        content: this.textarea,
        parent_id: this.replyId
      })
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.textarea = ''
        this.isshowTxt = false
        this.nickname = ''
        this.replyId = ''
        this.getCommentList()
      } else {
        this.$$toast(message)
      }
    },
    async onReply (id, nickname) {
      this.isshowTxt = true
      await this.$nextTick()
      this.$refs.txt.focus()
      // 回显到文本框nickname
      this.replyId = id
      this.nickname = '@' + nickname
    }

  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  height: 50px;
  align-items: center;
  .left {
    span {
      line-height: 50px;
    }
  }
  .center {
    flex: 1;
    span {
      font-size: 50px;
    }
  }
  .right {
    font-size: 14px;
    div {
      width: 60px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border-radius: 15px;
    }
    .followed {
      border: 1px solid #ccc;

    }
    .follow {
      color: #fff;
      background-color: #f00;
    }
  }
}
.content{
    font-size: 18px;
    padding: 10px;
    .user{
        margin: 10px 0;
        font-size: 14px;
        color: #666;
    }
    .btns{
      margin-top: 30px;
        display: flex;
        justify-content: space-around;
        >div{
            border: 1px solid #666;
            width: 80px;
            height: 32px;
            text-align: center;
            line-height: 32px;
            border-radius: 15px;
            font-size: 14px;
        }
        .likeActive{
  color: red;
  border: 1px solid red;
}
    }
    video{
  width: 100%;
}

}
.info{
  /deep/img{
    width: 100%;
  }
}
.footer{
  display: flex;
  position: fixed;
  bottom: 0;
  padding: 10px;
  border-top: 1px solid #ccc;
  background-color: #fff;
  .input{
    margin-top:-5px ;
    input{
      font-size: 14px;
      width: 220px;
      height: 36px;
      border: none;
      background-color: #eee;
      border-radius: 18px;
      text-indent: 1.5em;
    }
  }
  .iconpinglun- {
    position: relative;
    i{
      position: absolute;
      top:0;
      right: -5px;
      padding: 0 5px;
      background-color: red;
      font-size: 10px;
      border-radius: 6px;
      font-style: normal;
      color: #fff;
    }
  }
  span{
    font-size: 25px;
    margin: 5px 10px;
  }
  .starActive{
    color: red;
  }
}
// 评论区域
.comment{
  margin-top: 30px;
  border-top: 3px solid #ccc;
  h4{
    text-align: center;
  }
}
.footer-text{
  position: fixed;
  padding: 10px;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  height: 120px;
  border-top: 1px solid #ccc;
  background-color: #fff;
  .txt{
    font-size: 14px;
    width: 250px;
    height: 100%;
    border: none;
    background-color: #eee;
    border-radius: 15px;
    margin-right: 40px;
    text-indent: 1.5em;
  }
}

</style>
