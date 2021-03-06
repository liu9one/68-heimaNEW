import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入通用样式
import './styles/base.less'
import './styles/iconfont.css'
// 导入 vant
import Vant, { Toast } from 'vant'
import 'vant/lib/index.css'
// 导入 amfe- flexible html的fontSize会被设置为屏幕宽度的 1/10 自适应 在安装一个依赖包 postcss-pxtorem
import 'amfe-flexible'
// 注册全局组件header 全局头部
import newHeader from './components/new-header.vue'
// 注册全局  logo
import newLogo from './components/new-logo.vue'
import navItem from './components/nav-item.vue'
import hmPost from './components/hm-post.vue'
import hmComment from './components/hm-comment.vue'
import hmFloor from './components/hm-floor.vue'
// 导入axios
import axios from 'axios'
// 把axios挂载到vue原型上
import moment from 'moment'
Vue.prototype.$axios = axios
// 给 axios配置默认baseURL基准地址
const URL = 'http://localhost:3000'
axios.defaults.baseURL = URL
Vue.prototype.$baseUrl = URL

// 添加请求拦截器
axios.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  // 在请求头拦截器中通过config.headers访问到所有请求头/
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

const bus = new Vue()
Vue.prototype.$bus = bus
// 添加响应拦截器
axios.interceptors.response.use(function(response) {
  // 对响应数据做点什么
  // 只需要获得token
  const { statusCode, message } = response.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    // 1.跳转到主页面
    router.push('/login')
    // 2.清除失效消息
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    // 3.给提示 用户验证失败
    Toast.fail(message)
  }
  // console.log('拦截了', response)
  return response
})

moment.locale('zh-CN')
Vue.filter('time', (input, str = 'YYYY-MM-DD') => {
  return moment(input).format(str)
})
Vue.filter('timeNow', input => {
  return moment(input).fromNow()
})
Vue.component('new-header', newHeader)
Vue.component('nav-item', navItem)
Vue.component('new-logo', newLogo)
Vue.component('hm-post', hmPost)
Vue.component('hm-comment', hmComment)
Vue.component('hm-floor', hmFloor)

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
Vue.prototype.$url = function(url) {
  if (url.startsWith('http')) {
    return url
  } else {
    return URL + url
  }
}
