<template>
  <div>
    <mavon-editor ref="mdRef" v-model="value" @imgAdd="imgAdd"></mavon-editor>
  </div>
</template>

<script type='text/ecmascript-6'>
  import axios from 'axios'

  export default {
    name: '',
    data () {
      return {
        value: ''
      }
    },
    methods: {
      imgAdd (pos, $file) {
        // 将图片上传到服务器
        let formdata = new FormData()
        formdata.append('image', $file)
        axios.post('/articles/uploadImg', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          // 将返回的url替换文本中的图片url
          // this.$refs.mdRef.$img2Url(pos, res.data)
        })
      }
    },
    mounted () {
    }
  }
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
</style>