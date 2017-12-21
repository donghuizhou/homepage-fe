<template>
  <div class="login-container">
    <img class="login-bg">
    <ul class="login-box">
      <li class="login-title">WELCOME</li>
      <li class="login-inputs">
        <div class="login-inputItems">
          <div class="login-inputIcon">
            <i class="fa fa-user" aria-hidden="true"></i>
          </div>
          <div class="login-input">
            <input v-model="username" type="text" placeholder="username">
          </div>
        </div>
        <div class="login-inputItems">
          <div class="login-inputIcon">
            <i class="fa fa-unlock-alt" aria-hidden="true"></i>
          </div>
          <div class="login-input">
            <input v-model="password" @keyup.enter="login" onpaste="return false" type="password" placeholder="password">
          </div>
        </div>
      </li>
      <li class="login-btn">
        <a href="javascript:;" @click="login">Login</a>
      </li>
    </ul>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    name: '',
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      // 是否登录
      checkLogin () {},
      // 登录
      login () {
      }
    },
    mounted () {
    }
  }
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
.login-container
  position: relative
  width: 100%
  height: 100vh
  overflow: hidden
  .login-bg
    width: 100%
    height: 100%
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    background-image: url('../../assets/imgs/login_bg2.jpg')
    background-repeat: no-repeat
    background-size: 100% 100%
    filter: blur(2px)
  .login-box
    width: 300px
    margin: 200px auto
    border: 1px solid #E7E7E7
    border-radius: 5px
    background-color: #D5D6DA
    padding: 20px
    opacity: 0.7
    animation: drop-in 0.5s
    .login-title
      font-size: 35px
      text-align: center
    .login-inputs
      margin: 20px 0 0 0
      .login-inputItems
        background-color: #fff
        height: 40px
        text-align: center
        line-height: 40px
        display: flex
        border-radius: 5px
        &:last-child
          margin: 10px 0 0 0
        .login-inputIcon
          width: 40px 
          height: 40px
        .login-input  
          flex: 1
          input
            width: 100%
            outline: 0
    .login-btn  
      margin: 20px 0 0 0
      height: 40px
      a
        display: block
        font-size: 18px
        background-color: #277AFC 
        text-align: center
        line-height: 40px
        border-radius: 5px
        color: #fff

  @keyframes drop-in {
    0% {
      margin: 100px auto
      opacity: 0
    }
    100% {
      margin: 200px auto
      opacity: 0.7
    }
  }    
</style>
