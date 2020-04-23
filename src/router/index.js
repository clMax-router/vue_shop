import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/components/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/Login')
  },
  // 主页
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/components/Home'),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('@/components/Welcome')
      },
      // 用户列表
      {
        path: '/users',
        name: 'users',
        component: () => import('@/components/user/Users')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由守卫
router.beforeEach((to, from, next) => {
  // to代表要访问的路径
  // from 代表从哪来
  // next 是一个函数 表式放行
  // next() 放行 next(path) 跳转到path路径页面
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
