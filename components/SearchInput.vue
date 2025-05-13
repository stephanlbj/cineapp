<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { ref, watch } from 'vue'
import CustomInputField from '~/components/CustomInputField.vue'

const storedSearchQuery = useLocalStorage('searchQuery', '')
const searchQuery = ref(storedSearchQuery.value)

watch(searchQuery, (newValue) => {
  storedSearchQuery.value = newValue
})
</script>

<template>
  <div class="lg:w-9/12 mx-auto flex flex-row items-center">
    <CustomInputField
      v-model="searchQuery"
      label="Rechercher un film"
      variant="outlined"
      color="primary"
      rounded="xl"
      prepend-inner-icon="mdi-magnify"
      hide-details
    />
  </div>
</template>
