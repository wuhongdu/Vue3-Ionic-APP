import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Layout from '@/views/Layout.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/index/',
    component: Layout,
    children: [
      {
        path: '',
        redirect: '/index/home'
      },
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/User.vue')
      },
      {
        path: 'plant',
        name: 'Plant',
        component: () => import('@/views/Plant.vue')
      },
    ]
  },
  {
    path: '/start',
    name: 'Start',
    component: () => import('@/views/Start.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/control',
    name: 'Control',
    component: () => import('@/views/home/Ctrl.vue')
  },
  {
    path: '/video_play',
    name: 'VideoPlay',
    component: () => import('@/views/home/Videoview.vue')
  },
  {
    path: '/plant_detail',
    name: 'PlantDetail',
    component: () => import('@/views/plant_detail/index.vue')
  },
  {
    path: '/see_plant',
    name: 'SeePlant',
    component: () => import('@/views/plant_detail/see_plant.vue')
  },
  {
    path: '/user_detail',
    name: 'UserDetail',
    component: () => import('@/views/user/UserDetail.vue')
  },
  {
    path: '/user_item_container',
    name: 'UserItem',
    component: () => import('@/views/user/UserItemContainer.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  // console.log('route change : ' + JSON.stringify(to));
  if (localStorage.getItem('server') && to.path === "/start") {
    next({path: '/login'});
  } else if (to.path === '/login' && sessionStorage.getItem('iot_token')) {
    next({path: '/index/home'});
  } else {
    next()
  }
})

export default router
