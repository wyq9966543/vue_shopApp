<template>
  <div id="app">
      <router-view></router-view>
      <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import FooterGuide from "./components/FooterGuide/FooterGuide";

    export default {
        name: 'App',

        mounted () {
            this.$store.dispatch('getAddressXY')
            this.getAddress()
        },

        methods: {
            ...mapActions(['getAddress'])
        },

        components: {FooterGuide},

    }
</script>

<style lang="stylus" rel="stylesheet/">
    .app
        width: 100%;
        height: 100%;
        background: #f5f5f5;
        position: relative;
</style>
