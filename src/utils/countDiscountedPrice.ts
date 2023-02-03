const countDiscountedPrice = (
  price: number,
  discountPercentage: number,
): number => Math.round(price - (discountPercentage / 100) * price)

export default countDiscountedPrice
