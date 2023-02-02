import axiosInstance from '@/api'
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
      console.error('Error:', error)

      return {
        products: [],
        total: 0,
        limit: productsPerPage,
        skip: howManyToSkip,
        error: true,
      }
    }
  },
}

export default productService
