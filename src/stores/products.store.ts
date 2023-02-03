import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ProductList, QueryParams } from '@/types/products.model'
import productService from '@/services/products.service'

export const useProductStore = defineStore('productStore', () => {
  const productList = ref<ProductList>()
  async function getProductList(queryParams: QueryParams) {
    productList.value = await productService.fetchProducts(queryParams)
  }
  async function getProductsOfCategory(queryParams: QueryParams) {
    productList.value = await productService.fetchProductsOfCategory(
      queryParams,
    )
  }
  async function getSortedProductList(queryParams: QueryParams) {
    productList.value = await productService.fetchSortedProducts(queryParams)
  }
  async function getSortedProductsOfCategory(queryParams: QueryParams) {
    productList.value = await productService.fetchSortedProductsOfCategory(
      queryParams,
    )
  }

  return {
    productList,
    getProductList,
    getSortedProductList,
    getProductsOfCategory,
    getSortedProductsOfCategory,
  }
})
