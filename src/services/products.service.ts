import axiosInstance from '@/api'
import { fetchListErrorHandler } from '@/utils/errorHandler'
import type { ProductList, QueryParams } from '@/types/products.model'

const productService = {
  fetchProducts: async (
    { searchPhrase, howManyToSkip, productsPerPage }: QueryParams,
    sort: unknown,
  ): Promise<ProductList> => {
    const urlString = sort
      ? `products/search?q=${searchPhrase}&limit=100`
      : `products/search?q=${searchPhrase}&limit=${productsPerPage}&skip=${howManyToSkip}`

    try {
      const { data } = await axiosInstance.get(urlString)
      return data
    } catch (error) {
      return fetchListErrorHandler('Error while fetching products:', error)
    }
  },
  fetchProductsOfCategory: async (
    { category, howManyToSkip, productsPerPage }: QueryParams,
    sort: unknown,
  ): Promise<ProductList> => {
    const urlString = sort
      ? `products/category/${category}?limit=100`
      : `products/category/${category}?limit=${productsPerPage}&skip=${howManyToSkip}`
    try {
      const { data } = await axiosInstance.get(urlString)
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
