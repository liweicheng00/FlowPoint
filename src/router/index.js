import Vue from 'vue'
import VueRouter from 'vue-router'
import Flow from '../views/EditFlow.vue'
import EditStyle from '../views/EditStyle.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Flow
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/Flow',
    name: 'Flow',
    component: Flow
  },
  {
    path: '/EditStyle',
    name: 'EditStyle',
    component: EditStyle
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
