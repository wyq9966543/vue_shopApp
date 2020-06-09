<template>
    <!--首页外卖-->
    <div class="on">
        <section class="msite">
            <!--首页头部-->
            <HeaderTop :title="address.name">
                <span class="header_search" slot="left">
                    <i class="iconfont icon-sousuo"></i>
                </span>
                <span class="header_login" slot="right">
                    <span class="header_login_text">登录|注册</span>
                </span>
            </HeaderTop>
            <!--首页导航-->
            <nav class="msite_nav">
                <div class="swiper-container">
                    <div class="swiper-wrapper" v-if="categorys.length" >
                        <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
                            <a href="javascript:" class="link_to_food" v-for="(category, index) in categorys" :key="index">
                                <div class="food_container">
                                    <img :src="baseImageUrl + category.image_url">
                                </div>
                                <span>{{category.title}}</span>
                            </a>
                        </div>
                    </div>
                    <img src="./images/msite_back.svg" alt="back" v-else>
                    <!-- Add Pagination -->
                    <div class="swiper-pagination"></div>
                </div>
            </nav>
            <!--首页附近商家-->
            <ShopList/>
        </section>
    </div>
</template>

<script>
    import HeaderTop from "../../components/HeaderTop/HeaderTop";
    import Swiper from 'swiper'
    import 'swiper/css/swiper.min.css'
    import ShopList from "../../components/ShopList/ShopList";
    import {mapState} from 'vuex'

    export default {
        name: "MSite",
        data() {
            return {
                baseImageUrl:'https://fuss10.elemecdn.com'
            }
        },
        mounted() {
            this.$store.dispatch('getFoodCategarys')
            this.$store.dispatch('getShops')
        },

        computed: {
            ...mapState(['address','categorys']),

            //根据categorys一维数组生成一个二维数组
            categorysArr() {
                const {categorys} = this
                const arr = []
                let minArr = []
                //遍历categorys
                categorys.forEach (c => {
                    //如果当前小数组已经满了，创建一个新的
                    if(minArr.length===8 ) {
                        minArr = []
                    }
                    //如果当前的minArr是空的，将小数组保存到大数组中
                    if(minArr.length===0) {
                        arr.push(minArr)
                    }
                    minArr.push(c)
                })
                return arr
            }
        },

        watch: {
            categorys(value){
                /*setTimeout(() => {
                    //实现轮播
                    var mySwiper = new Swiper ('.swiper-container', {
                        loop: true, // 循环模式选项
                        // 分页器
                        pagination: {
                            el: '.swiper-pagination',
                        },
                    })
                },100)*/
                //界面更新就立刻实现轮播
                this.$nextTick(()=>{
                    new Swiper ('.swiper-container', {
                        loop: true, // 循环模式选项
                        // 分页器
                        pagination: {
                            el: '.swiper-pagination',
                        },
                    })
                })
            }
        },

        components: {ShopList, HeaderTop}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl"
    .msite  //首页
        width 100%
        .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
                width 100%
                height 100%
                .swiper-wrapper
                    width 100%
                    height 100%
                    .swiper-slide
                        display flex
                        justify-content center
                        align-items flex-start
                        flex-wrap wrap
                        .link_to_food
                            width 25%
                            .food_container
                                display block
                                width 100%
                                text-align center
                                padding-bottom 10px
                                font-size 0
                                img
                                    display inline-block
                                    width 50px
                                    height 50px
                            span
                                display block
                                width 100%
                                text-align center
                                font-size 13px
                                color #666
                .swiper-pagination
                    >span.swiper-pagination-bullet-active
                        background #02a774

</style>