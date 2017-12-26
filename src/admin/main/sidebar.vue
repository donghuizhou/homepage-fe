<template>
  <div class="sidebar-container">
    <!-- profile -->
    <div class="profile">
      <div class="avatar-wrap" @click="goIndex">
        <img src="../../assets/imgs/avatar.jpg" :class="[{'avatar-s': shrink}, 'avatar']">
      </div>
      <div class="username">{{userInfo.nickName}}</div>
    </div>
    <!-- menu -->
    <el-menu background-color="#344155" text-color="#fff" style="border: 0">
      <el-menu-item index="1" @click="sidebarRoute('adminArticleList')">
        <i class="fa fa-list-ul icon-style" aria-hidden="true"></i>
        <span slot="title" v-if="!shrink">文章列表</span>
      </el-menu-item>
      <el-menu-item index="2" @click="sidebarRoute('adminPublish')">
        <i class="fa fa-share icon-style" aria-hidden="true"></i>
        <span slot="title" v-if="!shrink">文章发布</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script type='text/ecmascript-6'>
  import { mapGetters } from 'vuex'
  export default {
    name: 'sidebar',
    props: ['shrink'],
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {
      goIndex () {
        this.$router.push({name: 'adminIndex'})
      },
      // sidebar 点击
      sidebarRoute (routeName) {
        this.$router.push({name: routeName})
      }
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
      &:hover
        cursor: pointer
      .avatar
        width: 100px
        border-radius: 200px
        transition: width 0.3s ease-in-out  
      .avatar-s
        width: 30px
        transition: width 0.1s ease-in-out  
    .username
      color: #fff
.icon-style
  width: 24px
  margin-right: 5px
  font-size: 18px
  text-align: center
  vertical-align: middle    
</style>