<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 flex items-center justify-center bg-black/30 z-50"
    >
      <div
        class="relative p-4 rounded-lg shadow-lg w-11/12 max-w-md bg-green-100 text-green-700"
      >
        <button
          @click="close"
          class="absolute top-2 right-2 text-gray-400 hover:text-black"
        >
          ✕
        </button>

        <p class="text-center text-lg font-semibold">{{ title }}</p>

        <div v-if="type === 'success'" class="mt-4 text-green-600 text-center font-semibold text-xl">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  show: Boolean,
  type: {
    type: String,
    default: "info",
  },
  title: String,
  message: String,
});
const emit = defineEmits(["close"]);
const close = () => emit("close");
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
