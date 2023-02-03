<template>
  <div class="app-select">
    <label v-if="label" class="app-select__label" :for="name">{{
      label
    }}</label>
    <select
      class="app-select__select"
      :name="name"
      :value="value"
      :placeholder="placeholder"
      @change="$emit('change', $event)"
    >
      <option value="" selected disabled hidden>
        {{ placeholder }}
      </option>
      <option v-if="!options.length" value="" disabled>
        No options to select
      </option>
      <option
        v-for="option in (options as any[])"
        :key="option?.value ?? option as (string | number | symbol)"
        :value="option?.value ?? option"
        class="app-select__option"
      >
        {{ option?.value ?? option }}
      </option>
    </select>
    <div
      v-if="value && allowEmptyValue"
      class="app-select__reset"
      @click="$emit('reset')"
    >
      x
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  value: {
    type: [Number, String],
    default: 0,
  },
  options: {
    type: [Array],
    default: () => [{ value: 0, text: '0' }],
  },
  label: { type: String, default: '' },
  name: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  allowEmptyValue: { type: Boolean, default: false },
})
defineEmits(['change', 'reset'])
</script>

<style lang="scss" scoped>
.app-select {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.app-select__reset {
  position: absolute;
  right: 1.2rem;
  bottom: 0.1rem;
  cursor: pointer;
}
</style>
