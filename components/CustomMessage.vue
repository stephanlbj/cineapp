<script setup lang="ts">
import type { StyleValue } from 'vue'
const props = defineProps({
  textProps: {
    type: String,
    default: '',
  },
  styleProps: {
    type: [String, Object] as PropType<StyleValue>,
    required: false,
    default: 'text-center sm:text-xl md:text-xl lg:text-2xl',
  },
})
</script>
<template>
  <p :class="props.styleProps">
    {{ props.textProps }}
  </p>
</template>
