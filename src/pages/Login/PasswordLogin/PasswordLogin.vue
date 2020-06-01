<template>
    <div class="on">
        <section>
            <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名">
            </section>
            <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="密码">
                <div class="switch_button off">
                    <div class="switch_circle"></div>
                    <span class="switch_text">...</span>
                </div>
            </section>
            <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码">
                <!--<img class="get_verification" src="./images/captcha.svg" alt="captcha">-->
            </section>
        </section>
    </div>
</template>

<script>
    export default {
        name: "PasswordLogin"
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>