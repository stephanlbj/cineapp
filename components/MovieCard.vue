<script setup lang="ts">
import type { Movie } from '~/domain/models/Movie'
import { useDateFormatter } from '~/composables/useDateFormatter'
import { useScrollStore } from '~/store/scrollStore'
const scrollStore = useScrollStore()
const { formatDate } = useDateFormatter()

const props = defineProps<{
  movie: Movie
}>()

const saveScrollPosition = () => {
  if (import.meta.client) {
    scrollStore.savePosition('/products', window.scrollY)
  }
}

const fallbackImage = '/images/404img.jpg'
const imageUrl = computed(() =>
  props.movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
    : fallbackImage,
)

const formattedTitle = computed(() => {
  const isMobile = window.innerWidth <= 640
  const maxLength = isMobile ? 50 : 20
  return props.movie.title.length > maxLength
    ? props.movie.title.slice(0, maxLength) + '...'
    : props.movie.title
})
</script>

<template>
  <NuxtLink
    :to="`/movie/${props.movie.id}`"
    class="movie-card"
    aria-label="Détails du film {{ props.movie.title }}"
    role="link"
    @click="saveScrollPosition"
  >
    <div class="poster-wrapper">
      <NuxtImg
        :src="imageUrl"
        :alt="`${props.movie.title} (${new Date(props.movie.release_date).getFullYear()})`"
        class="movie-poster"
        width="500"
        height="750"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw, 100vw"
        densities="1x, 2x"
        format="webp"
        quality="80"
      />
      <div class="hover-overlay">
        <p class="full-title">{{ props.movie.title }}</p>
      </div>
    </div>

    <div class="movie-info">
      <p class="movie-title">{{ formattedTitle }}</p>
      <p class="movie-release-date">{{ formatDate(props.movie.release_date) }}</p>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.movie-card {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: pointer;
  background-color: #1c1c1c;
  position: relative;

  &:hover .hover-overlay {
    opacity: 1;
  }
}

.poster-wrapper {
  width: 100%;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  border-radius: 12px;
  position: relative;
  transition: transform 0.3s ease;
}

.movie-poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
  font-size: 1.1rem;
  text-align: center;
  padding: 1rem;
  pointer-events: none;
}

.full-title {
  max-width: 90%;
  word-wrap: break-word;
}

.movie-info {
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  background-color: #2a2a2a;
  opacity: 1;
  transition: opacity 0.3s ease;
  flex-grow: 1;
  max-height: 80px;
  overflow: hidden;
}

.movie-title {
  font-size: clamp(0.8rem, 1.2vw, 1.2rem);
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  margin-bottom: 0.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 640px) {
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    height: auto;
  }
}

.movie-release-date {
  font-size: clamp(0.7rem, 1vw, 1rem);
  color: #b3b3b3;
  text-align: center;
}

.movie-card:hover .movie-info {
  opacity: 0;
}

.movie-card:hover .poster-wrapper {
  transform: scale(1.05);
}
</style>
