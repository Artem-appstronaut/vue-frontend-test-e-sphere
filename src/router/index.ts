import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'productList' }, // homepage disabled
    },
    {
      path: '/product-list',
      name: 'productList',
      component: () => import('../views/ProductListView.vue'),
    },
  ],
})

export default router
