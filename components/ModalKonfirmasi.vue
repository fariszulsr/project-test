<template>
  <transition name="slide-up">
    <div
      v-if="show"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end justify-center"
    >
      <div class="bg-white w-full max-w-md rounded-t-2xl p-6 shadow-lg">
        <h2 class="text-lg font-semibold mb-2">{{ title }}</h2>
        <p class="text-gray-600 mb-4">{{ message }}</p>
        <div class="flex justify-end gap-3">
          <Button
            @click="$emit('cancel')"
            customClass="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mt-4 rounded-[500px] w-[25%] text-center"
            label="No"
          />
          <Button
            @click="$emit('confirm')"
            customClass="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-4 rounded-[500px] w-[25%] text-center"
            label="Yes"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: Boolean,
  title: {
    type: String,
    default: "Konfirmasi",
  },
  message: {
    type: String,
    default: "Apakah Anda yakin?",
  },
});
defineEmits(["confirm", "cancel"]);
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
