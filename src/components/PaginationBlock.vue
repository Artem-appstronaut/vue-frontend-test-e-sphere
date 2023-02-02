<template>
  <div class="pagination">
    <AppSelect
      class="pagination__limit"
      :value="productsPerPage"
      :options="productsPerPageOptions"
      @change="$emit('changePageLimit', $event)"
    />
    <div v-if="totalItems && totalPages > 1" class="pagination__list">
      <div
        v-if="howManyToSkip > 0"
        class="pagination__item pagination__item--arrow"
        @click="$emit('changePage', activePage - 1)"
      >
        &lt;
      </div>
      <template v-for="page in totalPages" :key="page">
        <div
          v-if="isPageNumberVisible(page)"
          class="pagination__item pagination__item--number"
          :class="{ 'pagination__item--active': page === activePage }"
          @click="$emit('changePage', page)"
        >
          {{ page }}
        </div>
      </template>
      <div
        v-if="howManyToSkip + productsPerPage < totalItems"
        class="pagination__item pagination__item--arrow"
        @click="$emit('changePage', activePage + 1)"
      >
        &gt;
      </div>
    </div>
    <div class="pagination__empty">
      <!-- empty block for better alignement -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  productsPerPage: { type: Number, required: true },
  totalItems: { type: Number, default: 0 },
  howManyToSkip: { type: Number, required: true },
})
defineEmits(['changePageLimit', 'changePage'])

const productsPerPageOptions = [10, 25, 50, 100]

const totalPages = computed(() =>
  Math.ceil((props.totalItems || 0) / props.productsPerPage),
)
const activePage = computed(() =>
  Math.ceil(
    (props.howManyToSkip + props.productsPerPage) / props.productsPerPage,
  ),
)

const isPageNumberVisible = (page: number) => {
  const maxPageToShow = 5
  const { value: active } = activePage
  const { value: total } = totalPages

  const pageWithinStart = page <= maxPageToShow && active <= maxPageToShow
  const pageCloseToStart = pageWithinStart && active - page <= 2

  const pageWithinMiddle = active - page <= 2 && active - page >= -2

  const pageWithinEnd =
    page > total - maxPageToShow && active > total - maxPageToShow
  const pageCloseToEnd = pageWithinEnd && active - page >= -2

  return pageCloseToStart || pageWithinMiddle || pageCloseToEnd
}
</script>

<style lang="scss" scoped>
.pagination {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pagination__limit,
.pagination__list,
.pagination__empty {
  flex-basis: 33%;
}
.pagination__list {
  display: flex;
  justify-content: center;
}
.pagination__item {
  cursor: pointer;
}
.pagination__item--number {
  &.pagination__item--active {
    color: var(--color-accent);
  }
}
</style>
