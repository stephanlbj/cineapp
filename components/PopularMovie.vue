<script setup lang="ts">
import type { FetchOptions } from '~/types/fetchOptions'
import { movieEndpoints } from '~/infrastructure/api/movieEndpoints'
import { useMovieQuery } from '~/composables/useMovieQuery'

const config = useRuntimeConfig()

const options: FetchOptions = {
  method: 'GET',
  params: {
    api_key: config.public.tmdbApiKey,
    language: 'fr-FR',
  },
}

const { formattedPosts, fetchNextPage, hasNextPage, isFetching, isEmpty } = useMovieQuery(
  options,
  config.public.apiBaseUrl + movieEndpoints.popular,
)
const isClientHydrated = ref(false)

onMounted(() => {
  isClientHydrated.value = true
})
const isLoading = computed(() => {
  if (!isClientHydrated.value) return true

  return isFetching && formattedPosts.value.length === 0
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
