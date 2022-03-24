import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'
import homePage from '../views/home-page.vue'
import mainApp from '../views/board-app.vue'
import mainTable from '../views/board-views/main-table.vue'
import chart from '../views/board-views/chart.vue'

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
      name: 'board-app',
      component: mainApp,
      children: [
        { path: '', component: mainTable },
        { path: 'chart', component: chart },
      ],
    },
  ],
})

export default router
