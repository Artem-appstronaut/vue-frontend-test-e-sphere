import axiosInstance from '@/api'
import { fetchListErrorHandler } from '@/utils/errorHandler'
import type { ProductList, Product, QueryParams } from '@/types/products.model'
import sliceToPage from '@/utils/sliceToPage'
import soringFunction from '@/utils/sortingFunction'

const productService = {
  fetchProducts: async ({
    searchPhrase,
    howManyToSkip,
    productsPerPage,
  }: QueryParams): Promise<ProductList> => {
    try {
      const { data } = await axiosInstance.get(
        `products/search?q=${searchPhrase}&limit=${productsPerPage}&skip=${howManyToSkip}`,
      )
      return data
    } catch (error) {
      return fetchListErrorHandler('Error while fetching products:', error)
    }
  },
  fetchProductsOfCategory: async ({
    category,
    howManyToSkip,
    productsPerPage,
  }: QueryParams): Promise<ProductList> => {
    try {
      const { data } = await axiosInstance.get(
        `products/category/${category}?limit=${productsPerPage}&skip=${howManyToSkip}`,
      )
      return data
    } catch (error) {
      return fetchListErrorHandler(
        'Error while fetching products of category:',
        error,
      )
    }
  },
  fetchSortedProducts: async ({
    searchPhrase,
    howManyToSkip,
    productsPerPage,
    sortKey,
    sortOrder,
  }: QueryParams): Promise<ProductList> => {
    try {
      const { data } = await axiosInstance.get(
        `products/search?q=${searchPhrase}&limit=100`,
      )

      if (sortKey && sortOrder) {
        data.products.sort((a: Product, b: Product) =>
          soringFunction(a, b, sortKey, sortOrder),
        )
      }

      return sliceToPage(data, howManyToSkip, productsPerPage)
    } catch (error) {
      return fetchListErrorHandler(
        'Error while fetching sorted products:',
        error,
      )
    }
  },
  fetchSortedProductsOfCategory: async ({
    category,
    howManyToSkip,
    productsPerPage,
    sortKey,
    sortOrder,
  }: QueryParams): Promise<ProductList> => {
    try {
      const { data } = await axiosInstance.get(
        `products/category/${category}?limit=100`,
      )

      if (sortKey && sortOrder) {
        data.products.sort((a: Product, b: Product) =>
          soringFunction(a, b, sortKey, sortOrder),
        )
      }

      return sliceToPage(data, howManyToSkip, productsPerPage)
    } catch (error) {
      return fetchListErrorHandler(
        'Error while fetching sorted products of category:',
        error,
      )
    }
  },
}

export default productService
