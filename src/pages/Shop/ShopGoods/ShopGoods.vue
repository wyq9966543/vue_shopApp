<template>
    <div>
        <div class="goods">
           <!-- 左侧菜单-->
            <div class="menu-wrapper">
                <ul>
                    <li class="menu-item" v-for="(good, index) in goods" :key="index"
                        :class="{current:index === currentIndex}" @click="clickMenuItem(index)">
                        <span class="text bottom-border-1px">
                        <img class="icon" :src="good.icon" v-if="good.icon">
                        {{good.name}}
                        </span>
                    </li>
                </ul>
            </div>
            <!--右侧食物列表-->
            <div class="foods-wrapper">
                <ul ref="foodsUl">
                    <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
                        <h1 class="title">{{good.name}}</h1>
                        <ul>
                            <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index" @click="showFood(food)">
                                <div class="icon">
                                    <img width="57" height="57"
                                         :src="food.icon">
                                </div>
                                <div class="content">
                                    <h2 class="name">{{food.name}}</h2>
                                    <p class="desc">{{food.description}}</p>
                                    <div class="extra">
                                        <span class="count">月售 {{food.sellCount}} 份</span>
                                        <span>好评率 {{food.rating}}%</span></div>
                                    <div class="price">
                                        <span class="now">￥{{food.price}}</span>
                                        <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <!--购物车商品增减-->
                                        <CartControl :food="food"/>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <!--购物车-->
            <ShopCart/>
        </div>
        <!--显示食物详情-->
        <Food :food="food" ref="food"/>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import BScroll from '@better-scroll/core'
    import CartControl from "../../../components/CartControl/CartControl";
    import Food from "../../../components/Food/Food";
    import ShopCart from "../../../components/ShopCart/ShopCart";

    export default {
        name: "ShopGoods",
        components: {ShopCart, Food, CartControl},
        data() {
            return{
                scrollY: 0, //右侧滑动的Y轴坐标（滑动过程中实时变化）
                tops: [], //所有右侧分类li的top组成的数组（列表显示后不再变化）
                food: {}, //需要显示的food
            }
        },
        mounted() {
            this.$store.dispatch('getShopGoods', () =>{
                //better-scroll实现弹性滑动，方法一, 请求action时传一个回调函数调用
                this.$nextTick(() => {//列表更新后创建
                    this.initScroll()
                    this.initTops()
                })
            })
            this.$store.dispatch('clearCart')
        },

        computed: {
            ...mapState(['goods']),
            //计算得到当前分类的下标
            currentIndex(){
                //得到条件数据k
                const {scrollY, tops} = this
                //根据条件计算产生
                const index = tops.findIndex((top, index) => {
                    return scrollY>=top && scrollY<tops[index+1]
                })
                //返回结果
                return index
            }
        },
        methods: {
            //初始化滚动条
            initScroll() {
                new BScroll('.menu-wrapper', {click: true})
                this.foodsScroll = new BScroll('.foods-wrapper', {
                    probeType: 2,//手指离开后不触发scroll监听
                    click: true
                })
                //给右侧列表绑定scroll监听，收集scrollY
                this.foodsScroll.on('scroll', ({x,y}) => {
                    //console.log(x,y)
                    this.scrollY = Math.abs(y)
                })
                // 给右侧列表绑定scroll结束的监听
                this.foodsScroll.on('scrollEnd', ({x, y}) => {
                    //console.log('scrollEnd', x, y)
                    this.scrollY = Math.abs(y)
                })
            },

            //初始化tops
            initTops() {
                //1.初始化tops
                const tops = []
                let top = 0
                tops.push(top)
                //2.收集tops
                //找到所有分类的li
                const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
                //将伪数组转化为真数组
                Array.from(lis).map(li => {
                    top += li.clientHeight
                    tops.push(top)
                })
                //3.更新数据
                this.tops = tops
            },

            //左侧菜单点击事件，控制右侧列表滚动到对应位置
            clickMenuItem(index){
                //console.log(index)
                //得到目标位置的scrollY
                let scrollY = this.tops[index]
                //立即更新scrollY
                this.scrollY = scrollY
                //平滑滚动右侧列表
                this.foodsScroll.scrollTo(0, -scrollY, 300)

            },

            //显示点击的food
            showFood(food) {
                //设置food
                this.food = food
                //显示food组件
                this.$refs.food.toggleShow()
            }

        },
        watch: {
            /*//better-scroll实现弹性滑动，方法二
            goods(value){//监视goods，获取goods列表后实现滑动
                this.$nextTick(() => {//列表更新后创建
                    this.initScroll()
                    this.initTops()
                })
            }*/
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../../common/stylus/mixins.styl"
    .goods
        display: flex
        position: absolute
        top: 195px
        bottom: 46px
        width: 100%
        background: #fff;
        overflow: hidden
        .menu-wrapper
            flex: 0 0 80px
            width: 80px
            background: #f3f5f7
            .menu-item
                display: table
                height: 54px
                width: 56px
                padding: 0 12px
                line-height: 14px
                &.current
                    position: relative
                    z-index: 10
                    margin-top: -1px
                    background: #fff
                    color: $green
                    font-weight: 700
                    .text
                        border-none()
                .icon
                    display: inline-block
                    vertical-align: top
                    width: 12px
                    height: 12px
                    margin-right: 2px
                    background-size: 12px 12px
                    background-repeat: no-repeat
                .text
                    display: table-cell
                    width: 56px
                    vertical-align: middle
                    bottom-border-1px(rgba(7, 17, 27, 0.1))
                    font-size: 12px
        .foods-wrapper
            flex: 1
            .title
                padding-left: 14px
                height: 26px
                line-height: 26px
                border-left: 2px solid #d9dde1
                font-size: 12px
                color: rgb(147, 153, 159)
                background: #f3f5f7
            .food-item
                display: flex
                margin: 18px
                padding-bottom: 18px
                bottom-border-1px(rgba(7, 17, 27, 0.1))
                &:last-child
                    border-none()
                    margin-bottom: 0
                .icon
                    flex: 0 0 57px
                    margin-right: 10px
                .content
                    flex: 1
                    .name
                        margin: 2px 0 8px 0
                        height: 14px
                        line-height: 14px
                        font-size: 14px
                        color: rgb(7, 17, 27)
                    .desc, .extra
                        line-height: 10px
                        font-size: 10px
                        color: rgb(147, 153, 159)
                    .desc
                        line-height: 12px
                        margin-bottom: 8px
                    .extra
                        .count
                            margin-right: 12px
                    .price
                        font-weight: 700
                        line-height: 24px
                        .now
                            margin-right: 8px
                            font-size: 14px
                            color: rgb(240, 20, 20)
                        .old
                            text-decoration: line-through
                            font-size: 10px
                            color: rgb(147, 153, 159)
                    .cartcontrol-wrapper
                        position: absolute
                        right: 0
                        bottom: 12px
</style>