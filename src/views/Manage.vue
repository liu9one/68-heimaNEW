<template>
  <div class="manage" >
    <new-header>栏目管理</new-header>
    <div class="content">
      <div class="active">
        <h3>点击删除以下频道</h3>
        <div class="list">
          <div class="item" v-for="item in activeList" @click="delTab(item.id)" :key="item.id">{{item.name}}</div>
        </div>
      </div>
      <div class="deactive">
        <h3>点击添加以下频道</h3>
        <div class="list">
          <div class="item" v-for="item in deactiveList" :key="item.id" @click="addTab(item.id)">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeList: [],
      deactiveList: []
    }
  },
  created () {
    this.getTabList()
  },
  methods: {
    async getTabList () {
      const activeList = JSON.parse(localStorage.getItem('activeList'))
      const deactiveList = JSON.parse(localStorage.getItem('deactiveList'))
      if (activeList) {
        this.activeList = activeList
        this.deactiveList = deactiveList
        return
      }
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.activeList = data
        console.log(this.activeList)
      }
    },
    delTab (id) {
      if (this.activeList.length <= 4) return
      const index = this.activeList.findIndex(item => item.id === id)
      this.deactiveList.push(this.activeList[index])
      this.activeList.splice(index, 1)
    },
    addTab (id) {
      const index = this.deactiveList.findIndex(item => item.id === id)
      this.activeList.push(this.deactiveList[index])
      this.deactiveList.splice(index, 1)
    }
  },
  watch: {
    activeList: {
      deep: true,
      handler (val) {
        localStorage.setItem('activeList', JSON.stringify(val))
        localStorage.setItem('deactiveList', JSON.stringify(this.deactiveList))
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 10px;
  .active,
  .deactive {
    h3 {
      font-size: 14px;
      font-weight: 400;
      margin: 10px 0;
    }
    .list {
      overflow: hidden;
      .item {
        width: 60px;
        height: 30px;
        border: 1px solid #ccc;
        background-color: #eee;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
        float: left;
        margin: 5px;
      }
    }
  }
}

</style>
