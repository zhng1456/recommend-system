import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView'
import FirebaseUiLogIn from "@/components/FirebaseUILogIn";

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/signIn', name: 'signIn', component: FirebaseUiLogIn },
]

const router = new VueRouter({
  routes
})

export default router
