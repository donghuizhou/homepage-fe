<template>
  <div class="container">
    <div class="top-items toggle" @click="toggle">
      <i class="fa fa-bars" aria-hidden="true"></i>
    </div>
    <div class="top-items" @click="logout">退出</div>
    <!-- logout -->
    <el-dialog title="退出" :visible.sync="dialogVisible" width="30%">
      <span>是否确认退出</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="logoutConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type='text/ecmascript-6'>
  import { userLogout } from '@/api/api'
  import { mapMutations } from 'vuex'

  export default {
    name: 'top',
    data () {
      return {
        shrink: false,    // 是否收缩侧边栏
        dialogVisible: false
      }
    },
    methods: {
      // sidebar 收缩
      toggle () {
        this.shrink = !this.shrink
        this.$emit('toggle', this.shrink)
      },
      // logout
      logout () {
        this.dialogVisible = true
      },
      // logout confirm
      logoutConfirm () {
        userLogout()
          .then(res => {
            if (res.data.code === 200) {
              this.dialogVisible = false
              this.clearUserInfo('{}')
              this.$router.push({name: 'adminLogin'})
            } else {
              this.$message.error(res.data.msg)
            }
          })
      },
      ...mapMutations({
        clearUserInfo: 'SET_USERINFO'
      })
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
    .top-items
      float: right 
      line-height: 50px
      padding: 0 15px   
      &:hover
        cursor: pointer
        color: #FF7F24
    .toggle
      font-size: 20px
      float: left
</style>