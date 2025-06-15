<template>
  <button
    :type="type"
    :class="['bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50', customClass]"
    :disabled="disabled"
  > {{label}}
    <slot />
  </button>
</template>

<script setup>
defineProps({
  label: { type: String, default: 'Get' }, 
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
  customClass: { type: String, default: '' }
})
</script>