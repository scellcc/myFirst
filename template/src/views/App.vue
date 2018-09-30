<template>
    <div id="app">
      <router-view></router-view>
    </div>
</template>

<script>
    export default{
      name: 'app'
    }
</script>

<style lang="stylus">
    @import './../css/font.css';
    @import './../css/init.css';
    html,body,#app
        width 100%
        margin 0
        padding 0
        background:#fff
    body
        font-size 0.28rem
        line-height 1
    img
        display block 
</style>
