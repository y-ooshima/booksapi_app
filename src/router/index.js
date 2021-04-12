import Vue from 'vue'
import VueRouter from 'vue-router'
import BookView from '@/pages/BookView'
import BookEdit from '@/pages/BookEdit'
import BookIndex from '@/pages/BookIndex'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'BookIndex',
    component: BookIndex
},
{
    path: '/view',
    name: 'BookView',
    component: BookView
},
{
    path: '/edit/:id',
    name: 'BookEdit',
    component: BookEdit
},
{
  path: '*',
  redirect: '/'
},

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
