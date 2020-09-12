<template>
  <div class="my-comment">
      <new-header>我的回复</new-header>
    <div class="list">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
            >
      <div class="item" v-for="item in commentList" :key="item.id" >
        <div class="time">{{item.create_date | time('YYYY-MM-DD HH:mm')}}</div>
        <div class="comment" v-if="item.parent" >
          <div class="name">回复：{{item.parent.user.nickname}}</div>
          <div class="comment_content">{{item.parent.content}}</div>
        </div>
        <div class="content">{{item.content}}</div>
        <div class="origin">
          <span class="one-txt-cut">原文：{{item.post.title}}</span>
          <span class="iconfont iconjiantou1"></span>
        </div>
      </div>
      </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      commentList: [],
      pageIndex: 1,
      pageSize: 9,
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  created () {
    this.getCommentList()
  },
  methods: {
    async getCommentList () {
      const res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = [...this.commentList, ...data]
        this.loading = false
        this.refreshing = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad () {
      setTimeout(() => {
        this.pageIndex++
        this.getCommentList()
        console.log(this.commentList)
      }, 1000)
    },
    onRefresh () {
      setTimeout(() => {
        this.commentList = []
        this.pageIndex = 1
        this.finished = false
        this.loading = true
        this.getCommentList()
      }, 1000)
    }
  }
}
</script>

<style lang='less' scoped>
.item {
    font-size: 16px;
  border-bottom: 1px solid #ccc;
  padding: 10px 20px;
  .time {
    color: #666;
    padding: 10px 0;
  }
  .comment {
    background-color: #ddd;
    padding: 10px;
    .name {
      color: #666;
      font-size: 14px;
    }
    .comment_content {
      color: #999;
      line-height: 30px;
      margin-top: 10px;
    }
  }
  .content {
    margin: 10px 0;
  }
  .origin {
    font-size: 14px;
    color: #999;
    display: flex;
    justify-content: space-between;
  }
}
</style>
