<template>
  <input
    :type="type"
    :placeholder="placeholder"
    v-model="modelValue"
    class="w-full px-3 py-2 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
</template>

<script setup>
defineProps({
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  modelValue: String
})

defineEmits(['update:modelValue'])
</script>