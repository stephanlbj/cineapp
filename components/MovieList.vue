<script setup lang="ts">
import type { Movie } from '~/domain/models/Movie'
import CustomMessage from './CustomMessage.vue'
import { useInfiniteScroll } from '~/composables/useInfiniteScroll'
import type { InfiniteQueryObserverResult } from '@tanstack/vue-query'

const props = defineProps<{
  movies: Movie[]
  isLoading: boolean
  isEmpty: boolean
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>
  hasNextPage: boolean
  isFetching: boolean
}>()

const loadMoreTrigger = ref(null)
const hasNextPageRef = computed(() => props.hasNextPage)
const isFetchingRef = computed(() => props.isFetching)
const { isLoadingMore: loadingMore } = useInfiniteScroll(
  loadMoreTrigger,
  hasNextPageRef,
  isFetchingRef,
  props.fetchNextPage,
)
</script>

<template>
  <main class="w-full">
    <div v-if="isLoading" class="skeleton-wrapper">
      <SkeletonLoader v-for="n in 10" :key="n" />
    </div>

    <div v-else>
      <div v-if="isEmpty" class="no-results">
        <CustomMessage text-props="Aucun post trouvé" />
      </div>
      <section v-else>
        <ul class="posts-section">
          <li
            v-for="(movie, index) in props.movies"
            :id="'movie-' + movie.id"
            :key="movie.id"
            class="movie-item"
          >
            <MovieCard :movie="movie" :index="index" />
          </li>
        </ul>
      </section>

      <div v-if="loadingMore" class="skeleton-wrapper">
        <SkeletonLoader v-for="n in 10" :key="n" />
      </div>

      <div v-show="hasNextPage" ref="loadMoreTrigger" class="load-more-trigger" />
    </div>
  </main>
</template>

<style lang="scss" scoped>
[v-cloak] {
  display: none;
}

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
