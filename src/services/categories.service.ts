import axiosInstance from '@/api'
import type { Categories } from '@/types/products.model'

const categoriesService = {
  fetchCategories: async (): Promise<Categories> => {
    try {
      const { data } = await axiosInstance.get('products/categories')
      return data
    } catch (error) {
      console.error('Error while fetching categories:', error)

      return []
    }
  },
}

export default categoriesService
