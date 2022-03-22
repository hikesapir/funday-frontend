import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'
import homePage from '../views/home-page.vue'
import mainApp from '../views/main-app.vue'

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: homePage,
    },
    {
      path: '/boards/:id',
      name: 'main-app',
      component: mainApp,
    },
  ],
})

export default router
