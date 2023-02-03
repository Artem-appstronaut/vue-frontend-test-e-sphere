export const fetchListErrorHandler = (
  text: string = 'Error',
  error: unknown,
) => {
  console.error(text, error)

  // fallbback list object
  return {
    products: [],
    total: 0,
    limit: 0,
    skip: 0,
    error: true,
  }
}
