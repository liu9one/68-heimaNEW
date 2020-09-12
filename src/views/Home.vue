<template>
  <div class="home">
      <div class="header">
          <div class="home-logo">
              <span class="iconfont iconnew"></span>
          </div>
          <div class="search" @click="$router.push('/search')">
              <span class="iconfont iconsearch">搜索新闻</span>
          </div>
          <div class="user" @click="$router.push('/user')">
              <span class="iconfont iconwode"></span>
          </div>
      </div>
<!-- 项目管理功能  -->
  <van-sticky class="more-sticky">
        <div class="more" @click="$router.push('/manage')">
            <span class="iconfont iconlianjie"></span>
        </div>
         </van-sticky>
       <!-- 导航栏列表 -->
       <van-tabs v-model="active" sticky animated>
            <van-tab :title="tab.name" v-for="tab in tabsList"  :key="tab.id">
           <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
               <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                :immediate-check ='false'
                >
                <hm-post v-for="item in newsList" :post='item' :key="item.id"></hm-post>
                </van-list>
                </van-pull-refresh>
            </van-tab>
        </van-tabs>

  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      tabsList: [],
      pageIndex: 1,
      pageSize: 6,
      newsList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  created () {
    this.getTabsList()
  },
  methods: {
    async getTabsList () {
      const activeList = JSON.parse(localStorage.getItem('activeList'))
      if (activeList) {
        this.tabsList = activeList
        this.getNewsList(this.tabsList[0].id)
        return
      }
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabsList = data
        console.log(this.tabsList)
        this.getNewsList(this.tabsList[0].id)
      }
    },
    async getNewsList (id) {
      const res = await this.$axios.get('/post', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          category: id
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.newsList = [...this.newsList, ...data]
        this.loading = false
        this.refreshing = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
        console.log(this.newsList)
      }
    },
    onLoad () {
      this.pageIndex++
      this.getNewsList(this.tabsList[this.active].id)
    },
    onRefresh () {
      this.newsList = []
      this.pageIndex = 1
      this.loading = true
      this.finished = false
      this.getNewsList(this.tabsList[this.active].id)
    }
  },
  watch: {
    active (val) {
      this.newsList = []
      this.pageIndex = 1
      this.loading = true
      this.finished = false
      this.getNewsList(this.tabsList[val].id)
    }
  }
}
</script>

<style lang='less' scoped>
.home{
    /deep/ .van-tabs__wrap {
  width: 85%;
}
  /deep/  .more-sticky{
      .van-sticky--fixed{
        z-index: 999;
    }
  }
    .more{
        position: absolute;
        right: 0;
        height: 43px;
        width: 15%;
        line-height: 30px;
        text-align: center;
        background-color: #fff;
        z-index: 999;
    }
    .header{
        display: flex;
        height: 50px;
        background-color: #f00;
        color: #fff;
        text-align: center;
        .home-logo{
             text-align: center;
             margin-left:15px ;
            .iconfont{
                font-size: 50px;
                color: #fff;

                width: 60px;
            }
        }
        .search{
            flex: 1;
            width: 180px;
            height: 36px;
            background-color: rgba(255, 255, 255, .5) ;
            line-height: 30px;
            margin-top:7px ;
            border-radius: 18px;
        }
        .user{
            width: 60px;
            text-align: center;
        }
    }
}
</style>
