<template>
  <div>
          <hm-floor :post='post.parent' :count='count-1' v-if="post.parent"></hm-floor>
  <div class="floor">

     <div class="header">
         {{count}} <p>{{post.user.nickname}}</p>
         <p class="time"> {{post.create_date | timeNow}}</p>
         <span @click="reply">回复</span>
     </div>
     <div class="content">
         {{post.content}}
     </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'hm-floor',
  props: {
    post: Object,
    count: Number
  },
  data () {
    return {}
  },
  methods: {
    reply () {
      console.log(this.post.id, this.post.user.nickname)
      this.$bus.$emit('reply', this.post.id, this.post.user.nickname)
    }
  }
}
</script>

<style lang='less' scoped>
.floor{
    font-size: 16px;
    padding: 10px;
    border: 1px solid #ccc;
    .header{
        display: flex;
        font-size: 14px;
        margin-bottom: 15px;
        .time{
            flex: 1;
            margin-left: 10px;
            color: #666;
        }
        span{
            color: #666;
        }
    }
}

</style>
