<template>
  <div class="app-input">
    <label v-if="label" class="app-input__label" :for="name">{{ label }}</label>
    <input
      class="app-input__input"
      type="text"
      :name="name"
      :value="value"
      :placeholder="placeholder"
      @input="debouncedInput"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  value: { type: String, default: '' },
  label: { type: String, default: '' },
  name: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  debounceDuration: { type: Number, default: 2000 },
})

const emits = defineEmits(['input'])

let debounceTimeout: number | null = null

const debouncedInput = (e: any) => {
  if (debounceTimeout) clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    emits('input', e.target.value)
  }, props.debounceDuration)
}
</script>

<style lang="scss" scoped>
.app-input {
  display: flex;
  flex-direction: column;
  font-size: 1rem;
}
.app-input__input {
  padding: 0.25rem;
}
</style>
