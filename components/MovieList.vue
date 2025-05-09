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
          <li v-for="(movie, index) in formattedPosts" :key="movie.id" class="movie-item">
            <MovieCard :movie="movie" :index="index" />
          </li>
        </ul>
      </section>

      <div v-if="isLoadingMore" class="infinite-skeleton-wrapper">
        <SkeletonLoader v-for="n in 5" :key="n" />
      </div>
    </div>

    <div v-show="hasNextPage" ref="loadMoreTrigger" class="load-more-trigger">
      <CustomMessage
        v-if="!hasNextPage && !isFetching && !isEmpty"
        text-props="Plus de résultats."
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useMovieQuery } from '~/composables/useMovieQuery'
import { useInfiniteScroll } from '~/composables/useInfiniteScroll'
import { useHydrationState } from '~/composables/useHydrationState'
import CustomMessage from './CustomMessage.vue'
import type { FetchOptions } from '~/types/fetchOptions'
const config = useRuntimeConfig()

const loadMoreTrigger = ref(null)

const options: FetchOptions = {
  method: 'GET',
  params: {
    language: 'fr-FR',
  },
}

const { formattedPosts, fetchNextPage, hasNextPage, isFetching, refetch, isEmpty } = useMovieQuery({
  ...options,
  public: config.public,
})

const { isLoadingMore } = useInfiniteScroll(loadMoreTrigger, hasNextPage, isFetching, fetchNextPage)
const { isHydrated } = useHydrationState()
</script>

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
</style>
