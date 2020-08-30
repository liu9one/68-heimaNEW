import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入通用样式
import './styles/base.less'
import './styles/iconfont.css'
// 导入 vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 导入 amfe- flexible html的fontSize会被设置为屏幕宽度的 1/10 自适应 在安装一个依赖包 postcss-pxtorem
import 'amfe-flexible'
// 注册全局组件header 全局头部
import newHeader from './components/new-header.vue'
// 注册全局  logo
import newLogo from './components/new-logo.vue'
import navItem from './components/nav-item.vue'
// 导入axios
import axios from 'axios'
// 把axios挂载到vue原型上
import moment from 'moment'
Vue.prototype.$axios = axios
// 给 axios配置默认baseURL基准地址
axios.defaults.baseURL = 'http://localhost:3000'

Vue.filter('time', input => {
  return moment(input).format('YYYY-MM-DD')
})
Vue.component('new-header', newHeader)
Vue.component('nav-item', navItem)
Vue.component('new-logo', newLogo)

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
