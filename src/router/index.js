import Vue from 'vue'
import Router from 'vue-router'
import TodoApp from '@/components/TodoApp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TodoApp',
      component: TodoApp
    }
  ]
})
