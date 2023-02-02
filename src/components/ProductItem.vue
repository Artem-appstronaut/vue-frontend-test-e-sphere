<template>
  <div v-if="product.id" class="product-item">
    <div
      class="product-item__image"
      :style="`background-image: url(${product.thumbnail})`"
    >
      <!-- image on background -->
    </div>
    <h2 class="product-item__title">{{ product.title }}</h2>
    <p class="product-item__description">{{ product.description }}</p>
    <div class="product-item__details">
      <div class="product-item__price">
        <div
          v-if="product.discountPercentage"
          class="product-item__price-discount"
        >
          {{ discountedPrice }}
        </div>
        <div
          class="product-item__price-value"
          :class="{
            'product-item__price-value--discounted': product.discountPercentage,
          }"
        >
          {{ product.price }}
        </div>
      </div>
      <div class="product-item__rating">{{ product.rating }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from '@/types/products.model'
import { computed } from 'vue'

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
}
.product-item__price-value--discounted {
  text-decoration: line-through;
}
.product-item__details {
  display: flex;
  align-items: flex-end;
}
.product-item__image {
  height: 300px;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
@media (min-width: 768px) {
  .product-item__image {
    height: 250px;
  }
}
@media (min-width: 1024px) {
  .product-item__image {
    height: 200px;
  }
}
@media (min-width: 1200px) {
  .product-item__image {
    height: 150px;
  }
}
@media (min-width: 1500px) {
  .product-item__image {
    height: 100px;
  }
}
</style>
