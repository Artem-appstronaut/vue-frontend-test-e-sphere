import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ProductList, QueryParams } from '@/types/products.model'
import productService from '@/services/products.service'

export const useProductStore = defineStore('productStore', () => {
  const productList = ref<ProductList>()
  async function getProductList(queryParams: QueryParams) {
    productList.value = await productService.fetchProducts(queryParams)
  }

  return { productList, getProductList }
})
