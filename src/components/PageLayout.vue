<template>
  <div class="page">
    <h1 class="page__title">{{ title }}</h1>
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: { type: String, default: 'Page' },
})
</script>
