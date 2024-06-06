import Vue from 'vue'
import App from './App.vue'
import { Button, Layout, Menu, Breadcrumb, Icon } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './assets/css/override.less'

import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Breadcrumb)
Vue.use(Icon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
