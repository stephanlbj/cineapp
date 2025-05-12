<script setup lang="ts">
import type { FetchOptions } from '~/types/fetchOptions'
import { movieEndpoints } from '~/infrastructure/api/movieEndpoints'

const props = defineProps<{
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

const url = ref(config.public.apiBaseUrl + movieEndpoints.search + props.searchQuery)

const { formattedPosts, fetchNextPage, hasNextPage, isFetching, isEmpty, refetch } =
  useMovieSearchQuery(url.value, options, props.searchQuery)
const isClientHydrated = ref(false)

onMounted(() => {
  isClientHydrated.value = true
})
const isLoading = computed(() => {
  if (!isClientHydrated.value) return true

  return isFetching && formattedPosts.value.length === 0
})

watch(
  () => props.searchQuery,
  async (newQuery) => {
    url.value = config.public.apiBaseUrl + movieEndpoints.search + newQuery
    await refetch()
  },
)
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
