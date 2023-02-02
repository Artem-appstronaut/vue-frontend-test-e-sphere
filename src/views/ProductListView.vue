<template>
  <div class="product-list">
    <h1>{{ title }}</h1>
    <pre>{{ productList }}</pre>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useProductStore } from '@/stores/products.store'

const title = ref('Front End Challenge')
const productStore = useProductStore()
productStore.getProductList()

const productList = computed(() => productStore.productList)
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
