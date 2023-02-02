<template>
  <PageLayout :title="title" class="product-list">
    <SearchBlock
      class="product-list__search-block"
      :search-phrase="searchPhrase"
      @search-input="searchProducts"
    />
    <hr class="product-list__hr" />
    <FiltersBlock
      class="product-list__filters-block"
      :limit="productList?.limit"
      :total="productList?.total"
    />
    <ListWrapper
      class="product-list__list-wrapper"
      :loading="loading"
      :total="productList?.total"
      :error="productList?.error"
      empty-message="No products to display"
      error-message="Loading failed"
    >
      <ProductItem
        v-for="product in productList?.products"
        :key="product.id"
        class="product-list__item"
        :product="product"
      />
    </ListWrapper>
    <PaginationBlock
      class="product-list__pagination-block"
      :products-per-page="productsPerPage"
      :total-items="productList?.total"
      :how-many-to-skip="howManyToSkip"
      @change-page-limit="changePageLimit"
      @change-page="changePage"
    />
  </PageLayout>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useProductStore } from '@/stores/products.store'
import PaginationBlock from '@/components/PaginationBlock.vue'
import SearchBlock from '@/components/SearchBlock.vue'
import FiltersBlock from '@/components/FiltersBlock.vue'
import PageLayout from '@/components/PageLayout.vue'
import ProductItem from '@/components/ProductItem.vue'
import ListWrapper from '@/components/ListWrapper.vue'

const title = ref('Front End Challenge')
const productStore = useProductStore()
const searchPhrase = ref('')
const productsPerPage = ref(10)
const howManyToSkip = ref(0)
const loading = ref(true)
const productList = computed(() => productStore.productList)

const getProducts = async () => {
  loading.value = true
  await productStore.getProductList({
    searchPhrase: searchPhrase.value,
    productsPerPage: productsPerPage.value,
    howManyToSkip: howManyToSkip.value,
  })
  loading.value = false
}
const searchProducts = (search: string) => {
  searchPhrase.value = search
}
const changePageLimit = (e: any) => {
  productsPerPage.value = parseInt(e.target.value) || 10
}
const changePage = (page: number) => {
  howManyToSkip.value = page * productsPerPage.value - productsPerPage.value
}

watch([searchPhrase, productsPerPage, howManyToSkip], getProducts)

onBeforeMount(() => {
  getProducts()
})
</script>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  .product-list {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
