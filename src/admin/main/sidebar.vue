<template>
  <div class="sidebar-container">
    <!-- profile -->
    <div class="profile">
      <div class="avatar-wrap">
        <img src="../../assets/imgs/avatar.jpg" :class="[{'avatar-s': shrink}, 'avatar']">
      </div>
      <div class="username">admin</div>
    </div>
    <!-- menu -->
    <el-menu background-color="#344155" text-color="#fff" style="border: 0">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title" v-if="!shrink">导航一</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title" v-if="!shrink">导航二</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title" v-if="!shrink">导航三</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    name: 'sidebar',
    props: ['shrink'],
    data () {
      return {
      }
    },
    methods: {
    },
    mounted () {
    }
  }
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
.sidebar-container
  width: 100%
  .profile
    display: flex
    flex-direction: column
    align-items: center
    padding: 0 0 20px 0
    .avatar-wrap
      padding: 20px 0 10px 0
      .avatar
        width: 100px
        border-radius: 200px
        transition: width 0.3s ease-in-out  
      .avatar-s
        width: 50px
        transition: width 0.3s ease-in-out  
    .username
      color: #fff
</style>