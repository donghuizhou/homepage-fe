<template>
  <div class="main-container">
    <div :class="[{'sidebar-s': shrink}, 'sidebar']">
      <sidebar :shrink="shrink"></sidebar>
    </div>
    <div :class="[{'top-main-l': shrink}, 'top']">
      <top @toggle="toggle"></top>
    </div>
    <div :class="[{'top-main-l': shrink}, 'main']">
      <router-view/>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import Sidebar from './sidebar.vue'
  import Top from './top.vue'

  export default {
    name: 'name',
    data () {
      return {
        shrink: false
      }
    },
    methods: {
      // top toggle按钮事件
      toggle (val) {
        this.shrink = val
      }
    },
    mounted () {
    },
    components: {
      Sidebar,
      Top
    }
  }
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
  $sidebar-width = 180px
  $sidebar-shrink-width = 65px
  $top-height = 50px
  $sidebar-color = #344155

  .main-container
    .sidebar
      position: absolute
      top: 0
      left: 0
      bottom: 0
      width: $sidebar-width
      background-color: $sidebar-color
      transition: width 0.3s
    .sidebar-s
      width: $sidebar-shrink-width
      transition: width 0.3s
    .top
      position: absolute
      top: 0
      left: $sidebar-width
      right: 0
      height: $top-height
      border-bottom: 1px solid #e6e6e6
      transition: left 0.3s
      box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04)
    .main
      position: absolute
      top: $top-height + 4px
      left: $sidebar-width
      right: 0
      bottom: 0
      padding: 15px
      background-color: #fff
      overflow-y: scroll
      -webkit-overflow-scrolling: touch
      transition: left 0.3s
    .top-main-l
      left: $sidebar-shrink-width
      transition: left 0.3s
</style>