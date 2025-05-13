<script setup lang="ts">
import { useDebounce, useLocalStorage } from '@vueuse/core'
import CustomFallBack from '~/components/CustomFallBack.vue'
import PopularMovie from '~/components/PopularMovie.vue'
import SearchedMovie from '~/components/SearchedMovie.vue'
import SearchInput from '~/components/SearchInput.vue'

const storedSearchQuery = useLocalStorage('searchQuery', '')

const debouncedSearchQuery = useDebounce(storedSearchQuery, 500)
</script>

<template>
  <div>
    <ClientOnly>
      <template #fallback>
        <CustomFallBack message="Chargement..." />
      </template>
      <SearchInput />
    </ClientOnly>
    <PopularMovie v-if="!debouncedSearchQuery" />
    <SearchedMovie v-else :search-query="debouncedSearchQuery" />
  </div>
</template>
