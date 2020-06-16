<template>
    <section class="loginContainer">
        <div class="loginInner">
            <div class="login_header">
                <h2 class="login_logo">硅谷外卖</h2>
                <div class="login_header_title">
                    <router-link to="/login/messageLogin" replace>短信登录</router-link>
                    <router-link to="/login/passwordLogin" replace>密码登录</router-link>
                </div>
            </div>
            <div class="login_content">
                <form @submit.prevent="login">
                    <keep-alive>
                        <router-view @getMessage="getMessage" @getPassword="getPassword" @errTip="errTip" ref="child"></router-view>
                    </keep-alive>
                    <button class="login_submit">登录</button>
                </form>
                <a href="javascript:;" class="about_us">关于我们</a>
            </div>
            <a href="javascript:" class="go_back" @click="$router.back()">
                <i class="iconfont icon-jiantou2"></i>
            </a>
        </div>
        <AlertTip :alert-text="alertText" v-show="alertShow" @closeTip="closeTip"/>
    </section>
</template>

<script>
    import MessageLogin from "./MessageLogin/MessageLogin";
    import PasswordLogin from "./PasswordLogin/PasswordLogin";
    import AlertTip from "../../components/AlertTip/AlertTip";
    import {reqSmsLogin, reqPwdLogin} from "../../api";

    export default {
        name: "Login",
        components: {AlertTip, PasswordLogin, MessageLogin},
        data() {
            return {
                //loginWay: true, //true代表短信登录，false代表密码登录
                alertText: '', //提示文本
                alertShow: false, //显示提示框
                rightPhone: '',
                phone: '',
                code: '',
                name: '',
                pwd: '',
                captcha: ''
            }
        },
        computed: {
            loginWay:{
                get() {
                    return '/login/messageLogin'===this.$route.path
                },
                set(val){}
            },

        },
        methods: {
            showAlert(alertText) {
                this.alertShow = true
                this.alertText = alertText
            },

            async login() {
                //前台表单验证
                let result
                if(this.loginWay) {//短信登录
                    const {rightPhone, phone,  code} = this
                    if(!this.rightPhone) {
                        //手机号不正确
                        this.showAlert('手机号不正确')
                        return
                    }else if(!/^\d{6}$/.test(code)) {
                        //验证码不正确(六位数字)
                        this.showAlert('验证码不正确(六位数字)')
                        return
                    }
                    //发送ajax请求短信登录
                    result = await reqSmsLogin(phone, code)
                } else {//密码登录
                    const {name, pwd, captcha} = this
                    if(!this.name) {
                        //用户名
                        this.showAlert('用户名!')
                        return
                    }else if(!this.pwd) {
                        //密码
                        this.showAlert('密码!')
                        return
                    }else if(!this.captcha) {
                        //验证码
                        this.showAlert('验证码!')
                        return
                    }
                    //发送ajax请求密码登录
                    result = await reqPwdLogin({name, pwd, captcha})
                }
                //根据结果数据处理
                if(result.code === 0) {
                    const user = result.data
                    //将user保存到vuex的state中
                    this.$store.dispatch('recordUser', user)
                    //登录成功返回个人中心
                    this.$router.replace('/profile')
                }else {
                    if(!this.loginWay) {//短信登录
                        //显示新的图片验证码
                        this.$refs.child.getCaptcha()
                    }
                    //显示警告提示
                    const msg = result.msg
                    this.showAlert(msg)
                }
            },

            getMessage(rightPhone, phone, code) {
                this.rightPhone = rightPhone
                this.phone = phone
                this.code = code
            },

            getPassword(name, pwd, captcha) {
                this.name = name
                this.pwd = pwd
                this.captcha = captcha
            },

            errTip(err) {
                this.showAlert(err)
            },

            closeTip() {
                this.alertShow = false
                this.alertText = ''
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl"
    .loginContainer
        width 100%
        height 100%
        background #fff
        .loginInner
            padding-top 60px
            width 80%
            margin 0 auto
            .login_header
                .login_logo
                    font-size 40px
                    font-weight bold
                    color #02a774
                    text-align center
                .login_header_title
                    padding-top 40px
                    text-align center
                    >a
                        color #333
                        font-size 14px
                        padding-bottom 4px
                        &:first-child
                            margin-right 40px
                        &.router-link-active
                            color #02a774
                            font-weight 700
                            border-bottom 2px solid #02a774
    .login_content
        >form
                >div
                    input
                        width 100%
                        height 100%
                        padding-left 10px
                        box-sizing border-box
                        border 1px solid #ddd
                        border-radius 4px
                        outline 0
                        font 400 14px Arial
                        &:focus
                            border 1px solid #02a774

                .login_submit
                    display block
                    width 100%
                    height 42px
                    margin-top 30px
                    border-radius 4px
                    background #4cd96f
                    color #fff
                    text-align center
                    font-size 16px
                    line-height 42px
                    border 0
            .about_us
                display block
                font-size 12px
                margin-top 20px
                text-align center
                color #999
    .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
            font-size 20px
            color #999
</style>

