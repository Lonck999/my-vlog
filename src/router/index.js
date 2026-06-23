import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/home/HomeView.vue') },
    { path: '/blog', name: 'blog', component: () => import('@/views/blog/BlogView.vue') },
    { path: '/post/:id', name: 'post', component: () => import('@/views/blog/PostView.vue') },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('@/views/projects/ProjectsView.vue'),
    },
    { path: '/resume', name: 'resume', component: () => import('@/views/resume/ResumeView.vue') },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
