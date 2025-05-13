<script setup lang="ts">
import type { FetchOptions } from '~/types/fetchOptions'
import { movieEndpoints } from '~/infrastructure/api/movieEndpoints'
import { useQueryClient } from '@tanstack/vue-query'

const { searchQuery } = defineProps<{
  searchQuery: string
}>()

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
const url = computed(() => {
  const urlValue = config.public.apiBaseUrl + movieEndpoints.search + searchQuery
  return urlValue
})

const extractedSearchQuery = computed(() => {
  const urlParams = new URLSearchParams(url.value.split('?')[1])
  const extractedQuery = urlParams.get('query')
  return extractedQuery || ''
})

const { formattedPosts, fetchNextPage, hasNextPage, isFetching, isEmpty, refetch } =
  useMovieSearchQuery(url.value, options, extractedSearchQuery.value)

const isLoading = computed(() => {
  return isFetching && formattedPosts.value.length === 0
})

watch(url, async (newURl) => {
  if (!newURl.trim()) {
    return
  }
  const query = newURl.split('?')[1]
  if (url.value !== query) {
    await queryClient.invalidateQueries({ queryKey: queryKey.value })
    await refetch()
  }
})
</script>
<template>
  <main class="w-full">
    <MovieList
      :movies="formattedPosts"
      :is-loading="isLoading"
      :is-empty="isEmpty"
      :fetch-next-page="fetchNextPage"
      :has-next-page="hasNextPage"
      :is-fetching="isFetching"
    />
  </main>
</template>
