<template>
  <p class="text-center sm:text-xl md:text-xl lg:text-2xl">
    {{ props.textProps }}
  </p>
</template>
<script setup lang="ts">
const props = defineProps({
  textProps: {
    type: String,
    default: '',
  },
})
</script>
