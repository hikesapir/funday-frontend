import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'
import homePage from '../views/home-page.vue'
import mainApp from '../views/board-app.vue'
import mainTable from '../views/board-views/main-table.vue'
import chart from '../views/board-views/chart.vue'
import kanban from '../views/board-views/kanban.vue'

import myWork from '../views/my-work.vue'
import taskDetails from '../views/task-details.vue'
import users from '../views/users.vue'
import login from '../components/users/login.vue'
import signup from '../components/users/signup.vue'
import { faLitecoinSign } from '@fortawesome/free-solid-svg-icons'

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
        {
          path: '',
          component: mainTable,
          children: [
            {
              path: 'pulses/:groupId/:taskId',
              name: 'task-details',
              component: taskDetails,
            },
          ],
        },
        { path: 'chart', component: chart },
        { path: 'kanban', component: kanban },
      ],
    },
    {
      path: '/users',
      name: 'users',
      component: users,
      children: [
        {
          path: 'login',
          name: 'login',
          component: login,
        },
        {
          path: 'signup',
          name: 'sign-up',
          component: signup,
        },
      ],
    },
    {
      path: '/my-work',
      name: 'my-work',
      component: myWork,
    },
  ],
})

export default router
