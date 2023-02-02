<template>
  <div class="product-list">
    <h1>{{ title }}</h1>
    <pre>{{ productList }}</pre>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useProductStore } from '@/stores/products.store'

const title = ref('Front End Challenge')
const productStore = useProductStore()
const searchPhrase = ref('')
const productsPerPage = ref(10)
const howManyToSkip = ref(0)
const productList = computed(() => productStore.productList)

const getProducts = async () =>
  await productStore.getProductList({
    searchPhrase: searchPhrase.value,
    productsPerPage: productsPerPage.value,
    howManyToSkip: howManyToSkip.value,
  })

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
