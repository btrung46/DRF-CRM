import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'
import MyAccount from '@/views/dashboard/MyAccount.vue'
import store from '@/store'
import Leads from '@/views/dashboard/Leads.vue'
import AddLead from '@/views/dashboard/AddLead.vue'
import Lead from '@/views/dashboard/Lead.vue'
import Editlead from '@/views/dashboard/Editlead.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/log-in',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/dashboard/myaccount',
    name: 'MyAccount',
    component: MyAccount,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/Leads',
    name: 'Leads',
    component: Leads,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/Leads/Add',
    name: 'AddLead',
    component: AddLead,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/Leads/:id',
    name: 'Lead',
    component:Lead,
    meta: {
      requireLogin: true
    }
  },

  {
    path: '/dashboard/Leads/:id/edit',
    name: 'Editlead',
    component:Editlead,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from,next) =>{
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated){
    next('log-in')
  }else{
    next()
  }
})

export default router
