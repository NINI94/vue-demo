// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 配置mint-ui
import MintUI from 'mint-ui'
// 引入css
import 'mint-ui/lib/style.css'

// 配置axios
import Axios from 'axios'

// 安装插件，注册全局属性 及 挂载属性
Vue.use(MintUI)

// 配置公共URL
Axios.defaults.baseURL = ''
Vue.prototype.$axios = Axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
