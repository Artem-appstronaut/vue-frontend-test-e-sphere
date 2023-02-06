<template>
  <PageLayout :title="title" class="product-list">
    <SearchBlock
      class="product-list__search-block"
      :search-phrase="searchPhrase"
      :categories-list="categoriesList"
      @search-input="searchProducts"
      @select-category="filterByCategory"
      @reset-category="filterByCategory"
    />
    <hr class="product-list__hr" />
    <SortingBlock class="product-list__filters-block" />
    <ListWrapper
      class="product-list__list-wrapper"
      :loading="isLoadinng"
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
import { useCategoriesStore } from '@/stores/categories.store'
import PaginationBlock from '@/components/PaginationBlock.vue'
import SearchBlock from '@/components/SearchBlock.vue'
import SortingBlock from '@/components/SortingBlock.vue'
import PageLayout from '@/components/PageLayout.vue'
import ProductItem from '@/components/ProductItem.vue'
import ListWrapper from '@/components/ListWrapper.vue'
import type { Category } from '@/types/categories.model'

const title = ref('Front End Challenge')
const productStore = useProductStore()
const categoriesStore = useCategoriesStore()
const selectedCategory = ref('')
const searchPhrase = ref('')
const productsPerPage = ref(10)
const howManyToSkip = ref(0)
const isLoadinng = ref(true)
const currentSorting = computed(() => productStore.currentSorting)
const productList = computed(() => productStore.productList)
const categoriesList = computed(() => categoriesStore.categoriesList)

const getProducts = async () => {
  isLoadinng.value = true
  await productStore.getProductList({
    searchPhrase: searchPhrase.value,
    productsPerPage: productsPerPage.value,
    howManyToSkip: howManyToSkip.value,
  })
  isLoadinng.value = false
}
const getProductsOfCategory = async (category: Category) => {
  isLoadinng.value = true
  await productStore.getProductsOfCategory({
    category,
    productsPerPage: productsPerPage.value,
    howManyToSkip: howManyToSkip.value,
  })
  isLoadinng.value = false
}
const searchProducts = (search: string) => {
  howManyToSkip.value = 0
  selectedCategory.value = ''
  searchPhrase.value = search
}
const changePageLimit = (e: any) => {
  productsPerPage.value = parseInt(e.target.value) || 10
}
const changePage = (page: number) => {
  howManyToSkip.value = page * productsPerPage.value - productsPerPage.value
}
const filterByCategory = (category: string) => {
  searchPhrase.value = ''
  howManyToSkip.value = 0
  if (!category) return getProducts()

  selectedCategory.value = category
}
const getList = () => {
  if (selectedCategory.value)
    return getProductsOfCategory(selectedCategory.value)

  getProducts()
}

watch(
  [
    currentSorting,
    howManyToSkip,
    productsPerPage,
    searchPhrase,
    selectedCategory,
  ],
  getList,
)

onBeforeMount(() => {
  categoriesStore.getCategoriesList()
  getList()
})
</script>
