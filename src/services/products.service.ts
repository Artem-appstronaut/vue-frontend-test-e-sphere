import axiosInstance from '@/api'
import { fetchListErrorHandler } from '@/utils/errorHandler'
import type { ProductList, QueryParams } from '@/types/products.model'

const productService = {
  fetchProducts: async ({
    searchPhrase,
    productsPerPage,
    howManyToSkip,
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
    productsPerPage,
    howManyToSkip,
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
}

export default productService
