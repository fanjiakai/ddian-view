import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Index from '@/components/index'
import Model from '@/components/model/model'



// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/Login'], resolve);

Vue.use(Router)

let router = new Router({
// mode: 'history',
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login
    },{
      path:'/home',
      name: 'home',
      component: Home
    }, {
      path: '/',
      name: 'log',
      redirect: { name: 'home' },
    }, {
      path: '/model',
      name: 'model',
      component: Model
    }
  ]
});
/*
router.beforeEach((to, from, next) => {
  console.log('to:' + to.path)
  console.log('from:' + from.path)
  if (to.path.startsWith('/login')) {
    // window.localStorage.removeItem('access-token')
    //window.localStorage.removeItem('access-user')
    next()
  } else {
    //let user = JSON.parse(window.localStorage.getItem('access-token'))
    // let user = window.localStorage.getItem('access-token');
    // if (!user) {
    //   next({path: '/login'})
    // } else {
      next()
    // }
  }
  next()
})*/

export default router
