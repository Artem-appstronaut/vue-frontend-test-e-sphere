<template>
  <div class="rating">
    <!-- access key represents fill coverage of the stars -->
    <div
      class="star-ratings-css"
      :title="props.rating.toString()"
      :accesskey="filledPercent.toString()"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  rating: { type: Number, default: 0 },
})

const filledPercent = computed(() => {
  const percentRating = Math.round((props.rating / 5) * 100)
  const nearest = percentRating % 10 < 5 ? 5 : 10

  // round value to closest 5 or 10
  return (Math.round(percentRating / nearest) * nearest) / 100
})
</script>

<style lang="scss" scoped>
.star-ratings-css {
  unicode-bidi: bidi-override;
  color: var(--color-accent);
  font-size: 20px;
  width: 100px;
  position: relative;
}
.star-ratings-css::before {
  content: '☆☆☆☆☆';
}

// mixin to
@mixin width-keys($keys...) {
  @each $key in $keys {
    [accesskey='#{$key}']::after {
      width: percentage($key);
    }
  }
}

// list of keys which represent percentage coverage with 5% step
@include width-keys(
  0,
  0.05,
  0.1,
  0.15,
  0.2,
  0.25,
  0.3,
  0.35,
  0.4,
  0.45,
  0.5,
  0.55,
  0.6,
  0.65,
  0.7,
  0.75,
  0.8,
  0.85,
  0.9,
  0.95,
  1
);

.star-ratings-css::after {
  color: var(--color-accent);
  content: '★★★★★';
  text-shadow: 0 0 1px var(--color-accent);
  position: absolute;
  z-index: 1;
  display: block;
  left: 0;
  top: 0;
  overflow: hidden;
}
</style>
