<script setup lang="ts">
const { message } = defineProps({
  message: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <div class="mt-6">
    <p class="text-gray-600 italic text-center flex justify-center text-2xl">
      {{ message }}
    </p>
  </div>
</template>
