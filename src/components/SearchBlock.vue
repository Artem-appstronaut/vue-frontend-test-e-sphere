<template>
  <div class="search">
    <div class="search__input">
      <AppInput
        label="Search:"
        name="searchInput"
        :value="searchPhrase"
        :placeholder="searchPlaceholder"
        class="search__input-field"
        @input="inputSearchText"
      />
    </div>
    <div class="search__select">
      <AppSelect
        :key="selectKey"
        label="Search:"
        name="searchInput"
        :value="selectedCategory"
        :options="categoriesList"
        :placeholder="categoryPlaceholder"
        :allow-empty-value="true"
        class="search__select-field"
        @change="selectCategory"
        @reset="resetCategory"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

defineProps({
  searchPhrase: { type: String, default: '' },
  categoriesList: { type: Array, default: () => [] },
})

const emits = defineEmits(['searchInput', 'selectCategory', 'resetCategory'])

const selectedCategory = ref('')
const searchPlaceholder = 'What are you looking for?'
const categoryPlaceholder = 'Select category'
const selectKey = ref(0)

const inputSearchText = (searchText: any) => {
  emits('searchInput', searchText)
  resetCategory()
}
const selectCategory = (e: any) => {
  selectedCategory.value = e.target.value
  selectKey.value++
  emits('searchInput', '')
  emits('selectCategory', selectedCategory.value)
}
const resetCategory = () => {
  selectedCategory.value = ''
  selectKey.value++
  emits('resetCategory')
}
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  gap: 2rem;
}
</style>
