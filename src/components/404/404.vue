<template>
  <div class="notFount">
    <div class="content-wrapper">
      <span class="tips tips-oops">404!</span>
      <span class="tips tips-oops">OOPS!</span>
      <span class="tips tips-tips">您要访问的页面去火星了...</span>
      <span class="tips tips-check">请检查您输入的网址是否正确，点击以下按钮回到首页</span>
    </div>
    <div class="btn-wrapper">
      <el-button type="primary" size="small" round @click="handleGoIndex">回到首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notFound',
  data () {
    return {
    }
  },
  methods: {
    handleGoIndex () {}
  }
}
</script>

<style rel="stylesheet/stylus" scoped lang="stylus">
$bg-color = #F0F2F5
$tips-blue-color = #1482f0
$tips-grey-color = grey

.notFount
  width 100%
  height 100vh
  background-color $bg-color
  .content-wrapper
    padding: 120px 0 0 60px
    .tips
      display block
      margin 0 0 30px 0
    .tips-oops
      color $tips-blue-color
      font-size 40px
      font-weight 700
    .tips-tips 
      color $tips-blue-color
      font-size 25px
    .tips-check 
      color $tips-grey-color
      font-size 15px
      line-height 21px
  .btn-wrapper
    padding 0 0 0 60px    
</style>