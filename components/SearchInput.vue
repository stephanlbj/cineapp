<script setup lang="ts">
const searchQuery = ref('')

const emit = defineEmits<{
  (e: 'search', value: string): void
}>()

watch(searchQuery, (newValue) => {
  emit('search', newValue)
})
</script>
<template>
  <div class="lg:w-9/12 mx-auto flex flex-row items-center">
    <CustomInputField
      v-model="searchQuery"
      label="Rechercher un film "
      variant="outlined"
      color="primary"
      rounded="xl"
      prepend-inner-icon="mdi-magnify"
      hide-details
    />
  </div>
</template>
