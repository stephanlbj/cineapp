<script setup lang="ts">
import { useDebounce, useLocalStorage } from '@vueuse/core'
import CustomFallBack from '~/components/CustomFallBack.vue'
import PopularMovie from '~/components/PopularMovie.vue'
import SearchedMovie from '~/components/SearchedMovie.vue'
import SearchInput from '~/components/SearchInput.vue'

const storedSearchQuery = useLocalStorage('searchQuery', '')

const debouncedSearchQuery = useDebounce(storedSearchQuery, 500)
watchEffect(() => {
  useHead({
    title: debouncedSearchQuery.value
      ? `Résultats pour "${debouncedSearchQuery.value}"`
      : 'Films populaires',
    meta: [
      {
        name: 'description',
        content: debouncedSearchQuery.value
          ? `Découvrez les résultats de la recherche pour "${debouncedSearchQuery.value}".`
          : 'Consultez les films populaires du moment.',
      },
      {
        property: 'og:title',
        content: debouncedSearchQuery.value
          ? `Résultats pour "${debouncedSearchQuery.value}"`
          : 'Films populaires',
      },
      {
        property: 'og:description',
        content: debouncedSearchQuery.value
          ? `Voici les résultats pour "${debouncedSearchQuery.value}".`
          : 'Consultez les films les plus regardés du moment.',
      },
    ],
  })
})
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
