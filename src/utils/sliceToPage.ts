import type { ProductList } from '@/types/products.model'

const sliceToPage = (
  data: ProductList,
  skip: number,
  limit: number,
): ProductList => {
  data.products = data.products.slice(skip, skip + limit)

  return data
}

export default sliceToPage
