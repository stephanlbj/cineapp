<script setup lang="ts">
import { useMovieQuery } from '~/composables/useMovieQuery'
import { useHydrationState } from '~/composables/useHydrationState'
import CustomMessage from './CustomMessage.vue'
import type { FetchOptions } from '~/types/fetchOptions'
const config = useRuntimeConfig()

const loadMoreTrigger = ref(null)

const options: FetchOptions = {
  method: 'GET',
  params: {
    api_key: config.public.tmdbApiKey,
    language: 'fr-FR',
  },
}

const { formattedPosts, fetchNextPage, hasNextPage, isFetching, refetch, isEmpty } = useMovieQuery(
  options,
  config.public.apiBaseUrl,
)
const { isLoadingMore } = useInfiniteScroll(loadMoreTrigger, hasNextPage, isFetching, fetchNextPage)
const { isHydrated } = useHydrationState()
</script>

<template>
  <main class="w-full">
    <div v-if="!isHydrated" class="skeleton-wrapper">
      <SkeletonLoader v-for="n in 10" :key="n" />
    </div>

    <div v-else>
      <div v-if="isEmpty" class="no-results">
        <CustomMessage text-props="Aucun post trouvé" />
        <button @click="() => refetch()">Recharger</button>
      </div>
      <section v-else>
        <ul class="posts-section">
          <li
            v-for="(movie, index) in formattedPosts"
            :id="'movie-' + movie.id"
            :key="movie.id"
            class="movie-item"
          >
            <MovieCard :movie="movie" :index="index" />
          </li>
        </ul>
      </section>

      <div v-if="isLoadingMore" class="infinite-skeleton-wrapper">
        <SkeletonLoader v-for="n in 5" :key="n" />
      </div>

      <!-- Trigger pour le scroll infini -->
      <div v-show="hasNextPage" ref="loadMoreTrigger" class="load-more-trigger" />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.posts-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  padding: 0;
  margin: 2rem 1rem;
}

.skeleton-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 1.5rem;
  padding: 0;
  margin: 2rem 1rem;
}

.movie-item {
  list-style: none;
}

.load-more-trigger {
  height: 20px;
  margin-bottom: 2rem;
}
</style>
