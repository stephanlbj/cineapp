<script setup lang="ts">
import { useDebounce } from '@vueuse/core'
import CustomFallBack from '~/components/CustomFallBack.vue'
import PopularMovie from '~/components/PopularMovie.vue'
import SearchedMovie from '~/components/SearchedMovie.vue'
import SearchInput from '~/components/SearchInput.vue'

const searchQuery = ref('')
const debouncedSearch = useDebounce(searchQuery, 500)

const handleSearch = async (query: string) => {
  searchQuery.value = query
}
</script>

<template>
  <div>
    <ClientOnly>
      <template #fallback>
        <CustomFallBack message="Chargement..." />
      </template>
      <SearchInput @search="handleSearch" />
    </ClientOnly>
    <PopularMovie v-if="!debouncedSearch" />
    <SearchedMovie v-else :search-query="debouncedSearch" />
  </div>
</template>
