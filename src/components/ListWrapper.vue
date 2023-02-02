<template>
  <div :class="[loading ? 'list list--loading' : 'list']">
    <div v-if="loading" class="list__loading-message">
      {{ loadingMessage }}
    </div>
    <template v-else>
      <div v-if="total" class="list__items">
        <slot />
      </div>
      <template v-else>
        <div class="list__empty-message">{{ getMessage }}</div>
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  loading: { type: Boolean, default: true },
  total: { type: Number, default: 0 },
  error: { type: Boolean, default: false },
  emptyMessage: { type: String, default: 'No items' },
  errorMessage: { type: String, default: 'Error' },
  loadingMessage: { type: String, default: 'Loading...' },
})

const getMessage = computed(() =>
  props.error ? props.errorMessage : props.emptyMessage,
)
</script>

<style lang="scss" scoped>
.list__items {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
@media (min-width: 768px) {
  .list__items {
    grid-template-columns: 1fr 1fr;
  }
}
@media (min-width: 1024px) {
  .list__items {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
@media (min-width: 1200px) {
  .list__items {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
@media (min-width: 1500px) {
  .list__items {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
}
</style>
