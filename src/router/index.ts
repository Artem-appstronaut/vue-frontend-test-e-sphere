import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'productList',
      component: () => import('../views/ProductListView.vue'),
      props: { title: 'Front End Challenge' },
    },
  ],
})

export default router
