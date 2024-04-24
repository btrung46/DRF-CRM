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
import AddTeam from '@/views/dashboard/AddTeam.vue'
import Team from '@/views/dashboard/Team.vue'
import AddMember from '@/views/dashboard/AddMember.vue'
import Clients from '@/views/dashboard/Clients.vue'
import AddClient from '../views/dashboard/AddClient.vue'
import Client from '../views/dashboard/Client.vue'
import EditClient from '../views/dashboard/EditClient.vue'
import AddNote from '../views/dashboard/AddNote.vue'
import EditNote from '../views/dashboard/EditNote.vue'
import EditMember from '../views/dashboard/EditMember.vue'

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
    path: '/dashboard/add-team',
    name: 'AddTeam',
    component: AddTeam,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/team',
    name: 'Team',
    component: Team,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/team/add-member',
    name: 'AddMember',
    component: AddMember,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/Clients',
    name: 'Clients',
    component: Clients,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/clients/add',
    name: 'AddClient',
    component: AddClient,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/Clients/:id',
    name: 'Client',
    component: Client,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/Clients/:id/edit',
    name: 'EditClient',
    component: EditClient,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/notes/:id/add-note',
    name: 'AddNote',
    component: AddNote,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/notes/:id/edit-note/:note_id',
    name: 'EditNote',
    component: EditNote,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/editmember/:id',
    name: 'EditMember',
    component: EditMember,
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
