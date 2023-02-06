import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type {
  CurrentSort,
  Product,
  ProductList,
  QueryParams,
  SortKey,
  SortOrder,
} from '@/types/products.model'
import productService from '@/services/products.service'
import sortingProducts from '@/utils/sortingProducts'
import sliceToPage from '@/utils/sliceToPage'

export const useProductStore = defineStore('productStore', () => {
  const productList = ref<ProductList>()
  const currentSorting = ref<CurrentSort | null>(null)
  const totalItems = computed(() => {
    return productList.value?.total ?? 0
  })
  const displayItems = computed(() => {
    return productList.value?.limit ?? 0
  })
  const switchProductSortType = (key: SortKey, order: SortOrder) => {
    if (order === 'none') {
      currentSorting.value = null
    }
    currentSorting.value = {
      key,
      order,
    }
  }
  const prepareProductList = (data: ProductList, queryParams: QueryParams) => {
    if (!currentSorting.value) {
      return data
    }

    if (data.products.length < data.total) {
      data.total = data.products.length
    }
    if (queryParams.productsPerPage < data.limit) {
      data.limit = queryParams.productsPerPage
    }

    const { value: sort } = currentSorting
    data.products.sort((a: Product, b: Product) =>
      sortingProducts(a, b, sort.key, sort.order),
    )
    return sliceToPage(
      data,
      queryParams.howManyToSkip,
      queryParams.productsPerPage,
    )
  }
  const getProductList = async (queryParams: QueryParams) => {
    const data = await productService.fetchProducts(
      queryParams,
      currentSorting.value,
    )
    productList.value = prepareProductList(data, queryParams)
  }
  const getProductsOfCategory = async (queryParams: QueryParams) => {
    const data = await productService.fetchProductsOfCategory(
      queryParams,
      currentSorting.value,
    )
    productList.value = prepareProductList(data, queryParams)
  }

  return {
    productList,
    getProductList,
    getProductsOfCategory,
    switchProductSortType,
    currentSorting,
    displayItems,
    totalItems,
  }
})
