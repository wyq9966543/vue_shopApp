<template>
    <div>
        <section class="login_message">
            <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
            <button :disabled="!rightPhone" class="get_verification"
            :class="{right_phone: rightPhone}" @click.prevent="getCode">
                {{computeTime>0 ? `已发送(${computeTime}s)` : '获取验证码'}}
            </button>
        </section>
        <section class="login_verification">
            <input type="text" maxlength="8" placeholder="验证码" v-model="code">
        </section>
        <section class="login_hint">
            温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
            <a href="javascript:;">《用户服务协议》</a>
        </section>
    </div>
</template>

<script>
    import {reqSendCode} from '../../../api'
    export default {
        name: "MessageLogin",
        data() {
            return {
                phone: '', //手机号
                code: '', //验证码
                computeTime: 0, //倒计时的时间
            }
        },
        computed: {
            //验证手机号
            rightPhone() {
                return /^1\d{10}$/.test(this.phone)
            },
            //封装传递给父路由的数据
            getMsg() {
                const {rightPhone, phone, code} = this.rightPhone+','+this.phone+','+this.code
                return {rightPhone, phone, code}
            }
        },
        methods: {
            //获取验证码的倒计时
            async getCode() {
                //倒计时
                if(!this.computeTime){
                    this.computeTime = 30
                    this.intervalID = setInterval(() =>{
                        this.computeTime--
                        if(this.computeTime<=0) {
                            //停止计时
                            clearInterval(this.intervalID)
                        }
                    },1000)
                    //请求验证码
                    const result = await reqSendCode(this.phone)
                    if(result.code===1) {
                        //停止计时
                        if(this.computeTime) {
                            this.computeTime = 0
                            clearInterval(this.intervalID)
                            this.intervalID = null
                        }
                        // 失败提示
                        return this.$emit('errTip', result.msg)
                    }
                }

            },
        },
        watch: {
            //监听数据的变化并传递数据给父路由
            getMsg(value){
                this.$emit('getMessage',this.rightPhone,this.phone,this.code)
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
            &.right_phone
                color black
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
                //transform translateX(27px)
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
    .login_hint
        margin-top 12px
        color #999
        font-size 14px
        line-height 20px
        >a
            color #02a774
</style>