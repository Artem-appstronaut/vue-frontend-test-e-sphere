<template>
  <div class="search">
    <AppInput
      :value="searchPhrase"
      label="Search:"
      input-name="searchInput"
      :placeholder="searchPlaceholder"
      @input="$emit('searchInput', $event)"
    />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  searchPhrase: { type: String, default: '' },
})

defineEmits(['searchInput'])

const searchPlaceholder = 'What are you looking for?'
</script>
