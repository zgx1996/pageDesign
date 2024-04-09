import Vue from 'vue'
import VueRouter from 'vue-router'
import Editor from '../views/editor/Editor.vue'
import Test from '../views/test/Test.vue'
import Workspace from '../views/workspace/Workspace.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Editor',
    component: Editor
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/workspace',
    name: 'Workspace',
    component: Workspace
  }
]

const router = new VueRouter({
  routes
})

export default router
