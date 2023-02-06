import type { Product } from '@/types/products.model'

const countDiscountedPrice = (
  price: number,
  discountPercentage: number,
): number => Math.round(price - (discountPercentage / 100) * price)

const sortingProducts = (
  a: Product,
  b: Product,
  sortKey: string,
  sortOrder: string,
) => {
  let valueA: number = a[sortKey as keyof Product] as number
  let valueB: number = b[sortKey as keyof Product] as number
  if (sortKey === 'price') {
    valueA = countDiscountedPrice(valueA, a.discountPercentage)
    valueB = countDiscountedPrice(valueB, a.discountPercentage)
  }

  return sortOrder === 'asc' ? valueA - valueB : valueB - valueA
}
export default sortingProducts
