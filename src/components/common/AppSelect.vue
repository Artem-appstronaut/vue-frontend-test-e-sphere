<template>
  <div class="app-select">
    <select
      class="app-select__input"
      :value="value"
      @change="$emit('change', $event)"
    >
      <option
        v-for="option in (options as any[])"
        :key="option?.value ?? option as (string | number | symbol)"
        :value="option?.value ?? option"
        class="app-select__option"
      >
        {{ option?.value ?? option }}
      </option>
    </select>
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
})
defineEmits(['change'])
</script>
