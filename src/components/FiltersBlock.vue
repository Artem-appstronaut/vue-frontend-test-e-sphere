<template>
  <div class="filters">
    <div class="filters__total">
      <span class="filters__total-text">{{ limit }} of {{ total }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  limit: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
})
</script>
