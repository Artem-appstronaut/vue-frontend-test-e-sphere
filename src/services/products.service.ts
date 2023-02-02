import axiosInstance from '@/api'
import type { ProductList } from '@/types/products.model'

const productService = {
  fetchProducts: async (
    searchPhrase: string = '',
    productsPerPage: number = 10,
    howManyToSkip: number = 0,
  ): Promise<ProductList> => {
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
        skip: howManyToSkip,
        limit: productsPerPage,
        error: true,
      }
    }
  },
}

export default productService
