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
      <div
        v-if="productList?.total && howManyPages > 1"
        class="pagination__list"
      >
        <div
          v-if="howManyToSkip > 0"
          class="pagination__item arrow"
          @click="changePage(activePage - 1)"
        >
          &lt;
        </div>
        <template v-for="page in howManyPages" :key="page">
          <div
            v-if="isPageNumberVisible(page)"
            class="pagination__item number"
            :class="{ active: page === activePage }"
            @click="changePage(page)"
          >
            {{ page }}
          </div></template
        >
        <div
          v-if="howManyToSkip + productsPerPage < productList?.total"
          class="pagination__item"
          @click="changePage(activePage + 1)"
        >
          &gt;
        </div>
      </div>
    </div>
    <div :class="[loading ? 'loading' : 'products']">
      <template v-if="loading">Loading...</template>
      <template v-else>
        <pre v-if="productList?.total">{{ productList?.products }}</pre>
        <template v-else>{{ getMessage }}</template>
      </template>
    </div>
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
const loading = ref(true)
const productList = computed(() => productStore.productList)
const howManyPages = computed(() =>
  Math.ceil((productList.value?.total || 0) / productsPerPage.value),
)
const activePage = computed(
  () => (howManyToSkip.value + productsPerPage.value) / productsPerPage.value,
)
const getMessage = computed(() =>
  productList.value?.error ? 'Error' : 'Empty',
)

let searchTimeout: number | null = null

const getProducts = async () => {
  loading.value = true
  await productStore.getProductList({
    searchPhrase: searchPhrase.value,
    productsPerPage: productsPerPage.value,
    howManyToSkip: howManyToSkip.value,
  })
  loading.value = false
}

const debouncedSearch = (e: any) => {
  searchPhrase.value = e.target.value
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    getProducts()
  }, 2000)
}

const changePage = (page: number) => {
  howManyToSkip.value = page * productsPerPage.value - productsPerPage.value
}

const isPageNumberVisible = (page: number) => {
  const maxPageToShow = 5
  const { value: active } = activePage
  const { value: total } = howManyPages

  const pageWithinStart = page <= maxPageToShow && active <= maxPageToShow
  const pageCloseToStart = pageWithinStart && active - page <= 2

  const pageWithinMiddle = active - page <= 2 && active - page >= -2

  const pageWithinEnd =
    page > total - maxPageToShow && active > total - maxPageToShow
  const pageCloseToEnd = pageWithinEnd && active - page >= -2

  return pageCloseToStart || pageWithinMiddle || pageCloseToEnd
}

watch([productsPerPage, howManyToSkip], getProducts)

onBeforeMount(() => {
  getProducts()
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
.pagination__list {
  display: flex;
}
.pagination__item {
  cursor: pointer;

  &.active {
    color: #0090ff;
  }
}
</style>
