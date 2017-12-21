<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    let userAgent = navigator.userAgent.toLowerCase()
    if (userAgent.match('msie 6.0') || userAgent.match('msie 7.0') || userAgent.match('msie 8.0')) {
      this.$router.push({name: 'fuckBrowser'})
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
