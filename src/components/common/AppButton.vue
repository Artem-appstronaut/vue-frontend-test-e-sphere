<template>
  <div class="app-button">
    <button
      class="app-button__button"
      :class="{ 'app-button__button--active': active }"
      :name="name"
      @click="$emit('click')"
    >
      {{ label }}
    </button>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  label: { type: String, default: 'OK' },
  name: { type: String, default: '' },
  active: { type: Boolean, default: false },
})

defineEmits(['click'])
</script>

<style lang="scss" scoped>
.app-button {
  display: flex;
  flex-direction: column;
}
.app-button__button {
  border-color: transparent;
  border-radius: 0.25rem;
  cursor: pointer;

  &--active {
    background-color: var(--color-accent);
  }
}
</style>
