import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h=> h(App),
    router,
    store
})
