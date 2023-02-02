export type Category = string

export type Categories = Category[]

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

export interface ProductList {
  products: Product[]
  total: number
  skip: number
  limit: number
  error?: boolean
}
