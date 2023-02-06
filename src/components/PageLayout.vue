<template>
  <div class="page">
    <h1 class="page__title">{{ title }}</h1>
    <div class="page__wrapper">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: { type: String, default: 'Page' },
})
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  padding: 2rem 0 5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.page__title {
  margin-bottom: 1rem;
  font-weight: bold;
}
.page__wrapper {
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
}
</style>
