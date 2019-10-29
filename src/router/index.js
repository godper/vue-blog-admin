import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    name: "login",
    component: () => import('@/views/login/index'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index'),
    children: [
      {
        path: 'add-article',
        component: () => import('@/views/article/add.vue'),
      },
      {
        path: 'list-article',
        redirect: 'list-article/1'
      },
      {
        path: 'list-article/:page_num',
        component: () => import('@/views/article/list.vue'),
      },
      {
        path: 'view-article/:articleID',
        component: () => import('@/views/article/view.vue'),
        props: true,
      },
      {
        path: 'list-user',
        redirect: 'list-user/1'
      },
      {
        path: 'list-user/:page_num',
        component: () => import('@/views/user/list.vue'),
        props: true,
      },
      {
        path: 'list-admin',
        redirect: 'list-admin/1'
      },
      {
        path: 'list-admin/:page_num',
        component: () => import('@/views/admin/list.vue'), 
        props: true,
      },
      {
        path: 'list-tags',
        component: () => import('@/views/article/tag.vue'), 
        props: true,
      },
      {
        path: 'list-topics',
        component: () => import('@/views/article/topic.vue'), 
        props: true,
      }

    ],

  },
  {
    path: '*',
    redirect: '/',
  },
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!store.state.userinfo) {
    if (localStorage.getItem("admin-godper.com-store")) {
      store.replaceState(
        Object.assign(
          {},
          store.state,
          JSON.parse(localStorage.getItem("admin-godper.com-store"))
        )
      );
    }
  }
  if (to.name != "login") {
    if (store.state.userstatus != 1) {
      next({ path: "/login" })
    }
  }
  if (to.name == "login") {
    if (store.state.userstatus == 1) {
      next({ path: "/" })
    }
  }
  next()
})

export default router
