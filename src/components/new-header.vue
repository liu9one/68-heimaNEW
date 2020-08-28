<template>
  <div class="new-header">
      <div class="back">
          <span class="iconfont iconjiantou2" @click='$router.go(-1)'></span>
      </div>
      <div class="title"><slot></slot></div>
      <div class="extra"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less'>
.new-header{
    display: flex;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-bottom: 1px  #666 solid;
     font-weight: 700;
    .back,
    .extra{
        width: 50px;
    }
    .title{
        flex: 1;
        font-size: 20px;
    }
    .iconfont{
        font-size: 18px;
    }
}
</style>
