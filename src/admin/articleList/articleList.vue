<template>
  <div>
    <el-input v-model="value"></el-input>
    <el-button @click="handleSubmit" size="small" type="primary">submit</el-button>
    <div style="padding: 20px">{{txt}}</div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import axios from 'axios'

  export default {
    name: '',
    data () {
      return {
        value: '',
        txt: ''
      }
    },
    methods: {
      handleSubmit () {
        let data = {
          text: this.value
        }
        axios.post('/articles/uploadText', data).then(res => {
          this.txt = res.data.result
        })
      }
    },
    mounted () {
    }
  }
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
</style>
