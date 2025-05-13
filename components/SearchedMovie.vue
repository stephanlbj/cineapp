<script setup lang="ts">
import type { FetchOptions } from '~/types/fetchOptions'
import { movieEndpoints } from '~/infrastructure/api/movieEndpoints'
import { useQueryClient } from '@tanstack/vue-query'
import { useLocalStorage } from '@vueuse/core'
const { searchQuery } = defineProps<{
  searchQuery: string
}>()

const storedSearchQuery = useLocalStorage('searchQuery', '')

const config = useRuntimeConfig()

const options: FetchOptions = {
  method: 'GET',
  params: {
    api_key: config.public.tmdbApiKey,
    language: 'fr-FR',
  },
}
const queryClient = useQueryClient()

const queryKey = computed(() => ['movies-search', searchQuery])
const url = computed(() => config.public.apiBaseUrl + movieEndpoints.search)

const { formattedPosts, fetchNextPage, hasNextPage, isFetching, isEmpty, refetch } =
  useMovieSearchQuery(url.value, options)

watch(storedSearchQuery, async (newQuery) => {
  if (!newQuery.trim()) {
    return
  }

  await queryClient.invalidateQueries({ queryKey: queryKey.value })
  await refetch()
})
</script>
<template>
  <main class="w-full">
    <MovieList
      :movies="formattedPosts"
      :is-loading="isFetching"
      :is-empty="isEmpty"
      :fetch-next-page="fetchNextPage"
      :has-next-page="hasNextPage"
      :is-fetching="isFetching"
    />
  </main>
</template>
