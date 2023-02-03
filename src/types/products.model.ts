import type { Category } from './categories.model'

export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: Category
  thumbnail: string
  images: string[]
}

export interface QueryParams {
  category?: Category
  searchPhrase?: string
  productsPerPage: number
  howManyToSkip: number
}

export interface ProductList {
  products: Product[]
  total: number
  skip: number
  limit: number
  error?: boolean
}
