import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './App'
import router from './router'
import store from './store'

import './mock/mockServer'

Vue.config.productionTip = false

Vue.component(Button.name, Button) //<mt-button>

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h=> h(App),
    router,
    store
})
