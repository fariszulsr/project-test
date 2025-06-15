<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-200 to-blue-500"
  >
    <NuxtLink to="/" class="log-out-button"><PowerIcon class="h-6 w-6 text-white" /></NuxtLink>
    <div class="bg-white/30 p-6 rounded-xl shadow-lg w-80">
      <h2 class="text-white text-xl mb-6">Home</h2>
      <NuxtLink to="/GetStars" class="btn-block">Get the Stars</NuxtLink>
      <NuxtLink to="/SpelledOut" class="btn-block">Spelled Out</NuxtLink>
      <NuxtLink to="/FormData" class="btn-block">Form Data</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { PowerIcon } from "@heroicons/vue/24/solid";
</script>
