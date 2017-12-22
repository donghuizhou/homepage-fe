<template>
  <div class="container">
    <div class="toggle" @click="toggle">
      <i class="fa fa-bars" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    name: 'top',
    data () {
      return {
        shrink: false    // 是否收缩侧边栏
      }
    },
    methods: {
      // sidebar 收缩
      toggle () {
        this.shrink = !this.shrink
        this.$emit('toggle', this.shrink)
      }
    },
    mounted () {
    }
  }
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
@import '~assets/stylus/mixin.styl'
  .container
    height: 50px
    &:after
      clearFloat()
    .toggle
      font-size: 20px
      float: left
      line-height: 50px
      padding: 0 15px
      &:hover
        cursor: pointer
        color: #FF7F24
</style>