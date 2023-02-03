<template>
  <div class="rating">
    <div class="stars__empty">
      <span v-for="i in 5" :key="i" class="star">&star;</span>
    </div>
    <div class="starts__full">
      <span
        v-for="i in 5"
        :key="i"
        class="star"
        :class="{ 'starts__full--empty': i > filledStars }"
        >&starf;</span
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  rating: { type: Number, default: 0 },
})

const filledStars = computed(() => Math.floor(props.rating))
const remainder = computed(() =>
  Math.round((props.rating - filledStars.value) * 100),
)
</script>

<style lang="scss" scoped>
.rating {
  width: 100%;
  position: relative;
}
.stars__empty,
.starts__full {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 1rem;
  color: var(--color-accent);
}
.starts__full--empty {
  color: transparent;
}
</style>
