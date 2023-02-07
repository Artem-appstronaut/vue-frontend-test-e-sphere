import type { Category } from './categories.model'

export type SortKey = 'price' | 'stock' | 'rating'
export type SortOrder = 'none' | 'asc' | 'desc'
export type CurrentSort = {
  key: SortKey
  order: SortOrder
}

export type Sorting = {
  [key in SortKey]: SortOrder
}

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
  sortKey?: string
  sortOrder?: SortOrder
}

export interface ProductList {
  products: Product[]
  total: number
  skip: number
  limit: number
  error?: boolean
}
