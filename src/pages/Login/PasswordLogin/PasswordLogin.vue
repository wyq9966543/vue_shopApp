<template>
    <div>
        <section>
            <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
            </section>
            <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
                <div class="switch_button" :class="showPwd ? 'on':'off'" @click="showPwd=!showPwd">
                    <div class="switch_circle" :class="{on:showPwd}"></div>
                    <span class="switch_text">{{showPwd ? 'abc':'...'}}</span>
                </div>
            </section>
            <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:3000/captcha" alt="captcha"
                @click="getCaptcha" ref="captcha">
            </section>
        </section>
    </div>
</template>

<script>
    export default {
        name: "PasswordLogin",
        data() {
            return {
                showPwd: false,//是否显示密码
                name: '', //用户名
                pwd: '', //密码
                captcha: '' //验证码
            }
        },
        mounted() {
            //刷新页面后重新获取验证码
            this.getCaptcha()
        },
        computed: {
            //封装传递给父路由的数据
            getPwd() {
                const {name, pwd, captcha} = this.name+','+this.pwd+','+this.captcha
                return {name, pwd, captcha}
            }
        },
        methods: {
            //更新验证码
            getCaptcha() {
                this.$refs.captcha.src = 'http://localhost:3000/captcha?time='+Date.now()
            }
        },
        watch: {
            //监听数据的变化并给传递数据给父路由
            getPwd(value){
                //指定不同的src值
                this.$emit('getPassword',this.name,this.pwd,this.captcha)
            },
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .login_message
        position relative
        margin-top 16px
        height 48px
        font-size 14px
        background #fff
        .get_verification
            position absolute
            top 50%
            right 10px
            transform translateY(-50%)
            border 0
            color #ccc
            font-size 14px
            background transparent
    .login_verification
        position relative
        margin-top 16px
        height 48px
        font-size 14px
        background #fff
        .switch_button
            font-size 12px
            border 1px solid #ddd
            border-radius 8px
            transition background-color .3s,border-color .3s
            padding 0 6px
            width 30px
            height 16px
            line-height 16px
            color #fff
            position absolute
            top 50%
            right 10px
            transform translateY(-50%)
            &.off
                background #fff
                .switch_text
                    float right
                    color #ddd
            &.on
                background #02a774
            >.switch_circle
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                transition transform .3s
                &.on
                    transform translateX(27px)
    .login_hint
        margin-top 12px
        color #999
        font-size 14px
        line-height 20px
        >a
            color #02a774
</style>