<template>
  <div class="filters">
    <div class="filters__controls">
      <AppButton
        v-for="(sort, key) in sorting"
        :key="key"
        :label="getSortLabelWithArrow(key, sort)"
        :name="`${key}SortButton`"
        :active="sort !== 'none'"
        :class="sort"
        @click="sortBy(key, sort)"
      />
    </div>
    <div class="filters__info">
      <span class="filters__info-text">{{ limit }} of {{ total }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import decodeHTML from '@/utils/decodeHTML'
import type { Sorting, SortKey, SortOrder } from '@/types/products.model'
import { useProductStore } from '@/stores/products.store'

const productStore = useProductStore()
const limit = computed(() => productStore.displayItems)
const total = computed(() => productStore.totalItems)

const sorting = ref<Sorting>({
  price: 'none',
  stock: 'none',
  rating: 'none',
})

const getSortLabelWithArrow = (key: string, sort: string) => {
  if (sort === 'none') return key

  const arrow = sort === 'asc' ? decodeHTML('&#9652;') : decodeHTML('&#9662;')
  return `${key} ${arrow}`
}

const switchSort = (key: SortKey, type: SortOrder) => {
  switch (type) {
    case 'none':
      sorting.value[key] = 'desc'
      break
    case 'desc':
      sorting.value[key] = 'asc'
      break
    case 'asc':
      sorting.value[key] = 'none'
      break
  }
}

const sortBy = (key: SortKey, currentState: SortOrder) => {
  for (let sort in sorting.value) {
    if (sort !== key) sorting.value[sort as SortKey] = 'none'
    else switchSort(sort, currentState)
  }

  productStore.switchProductSortType(key, sorting.value[key])
}
</script>

<style lang="scss" scoped>
.filters {
  margin: 0.5rem 0 2rem;
  display: flex;
  justify-content: space-between;
}
.filters__controls {
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
}
</style>
