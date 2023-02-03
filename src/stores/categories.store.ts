import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Categories } from '@/types/categories.model'
import categoriesService from '@/services/categories.service'

export const useCategoriesStore = defineStore('categoriesStore', () => {
  const categoriesList = ref<Categories>()
  async function getCategoriesList() {
    categoriesList.value = await categoriesService.fetchCategories()
  }

  return { categoriesList, getCategoriesList }
})
