import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ProductList } from '@/types/products.model'
import productService from '@/services/products.service'

export const useProductStore = defineStore('productStore', () => {
  const productList = ref<ProductList>()
  async function getProductList() {
    productList.value = await productService.fetchProducts()
  }

  return { productList, getProductList }
})
