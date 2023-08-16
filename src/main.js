import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';//引入路由组件
import ElementUI from 'element-ui'; // 2.1引入结构
import router from "@/router";
import 'element-ui/lib/theme-chalk/index.css'; // 2.2引入样式

Vue.use(VueRouter);
Vue.use(ElementUI); // 3.安装

Vue.config.productionTip = false


new Vue({
  el:"#app",
  render: h => h(App),
  router:router
})
