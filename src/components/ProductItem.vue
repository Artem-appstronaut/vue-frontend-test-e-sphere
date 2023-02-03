<template>
  <div v-if="product.id" class="product-item">
    <div
      class="product-item__image"
      :style="`background-image: url(${product.thumbnail})`"
    >
      <!-- image on background -->
    </div>
    <div class="product-item__info">
      <h2 class="product-item__title">{{ product.title }}</h2>
      <p class="product-item__description">{{ product.description }}</p>
      <div class="product-item__details">
        <div class="product-item__price">
          <div
            v-if="product.discountPercentage"
            class="product-item__price-discount"
          >
            $ {{ discountedPrice }}
          </div>
          <div
            class="product-item__price-value"
            :class="{
              'product-item__price-value--discounted':
                product.discountPercentage,
            }"
          >
            $ {{ product.price }}
          </div>
        </div>
        <div class="product-item__rating">
          <RatingStars :rating="product.rating" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from '@/types/products.model'
import { computed } from 'vue'
import RatingStars from './RatingStars.vue'

const props = defineProps({
  product: { type: Object, default: (): Product => ({} as Product) },
})

const discountedPrice = computed(() =>
  Math.round(
    props.product.price -
      (props.product.discountPercentage / 100) * props.product.price,
  ),
)
</script>

<style lang="scss" scoped>
.product-item {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 0.25rem;
}
.product-item__info {
  padding: 0.75rem 0.75rem 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
}
.product-item__title {
  font-weight: bold;
  font-size: 1.25rem;
  line-height: 1.5rem;
  color: #000;
}
.product-item__description {
  margin: 0.5rem 0;
}
.product-item__details {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.product-item__rating {
  flex-grow: 1;
}
.product-item__price {
  flex-grow: 1;
}
.product-item__price-discount {
  color: var(--color-accent);
  font-weight: bold;
  font-size: 1rem;
  line-height: 1rem;
}
.product-item__price-value {
  color: #000;
  font-weight: bold;
}
.product-item__price-value--discounted {
  text-decoration: line-through;
}
.product-item__image {
  height: 15rem;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
@media (min-width: 768px) {
  .product-item__image {
    height: 12rem;
  }
}
@media (min-width: 1024px) {
  .product-item__image {
    height: 10rem;
  }
}
@media (min-width: 1500px) {
  .product-item__image {
    height: 8rem;
  }
}
</style>
