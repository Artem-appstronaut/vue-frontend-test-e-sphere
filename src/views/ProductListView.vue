<template>
  <div class="product-list">
    <h1>{{ title }}</h1>
    <div class="controls">
      <input :value="searchPhrase" type="text" @input="debouncedSearch" />
    </div>
    <div class="filters">
      <div class="filters__total">
        <span>{{ productList?.limit }} of {{ productList?.total }}</span>
      </div>
    </div>
    <div class="pagination">
      <select v-model="productsPerPage" class="pagination__limit">
        <option
          v-for="option in productsPerPageOptions"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>
    <pre>{{ productList?.products }}</pre>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useProductStore } from '@/stores/products.store'

const title = ref('Front End Challenge')
const productStore = useProductStore()
const searchPhrase = ref('')
const productsPerPage = ref(10)
const productsPerPageOptions = [10, 25, 50, 100]
const howManyToSkip = ref(0)
const productList = computed(() => productStore.productList)

let searchTimeout: number | null = null

const getProducts = async () =>
  await productStore.getProductList({
    searchPhrase: searchPhrase.value,
    productsPerPage: productsPerPage.value,
    howManyToSkip: howManyToSkip.value,
  })

const debouncedSearch = (e: any) => {
  searchPhrase.value = e.target.value
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(async () => {
    await getProducts()
  }, 2000)
}

watch([productsPerPage, howManyToSkip], getProducts)

onBeforeMount(async () => {
  await getProducts()
})
</script>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  .product-list {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
