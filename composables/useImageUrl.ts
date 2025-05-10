import { computed } from 'vue'

export const useImageUrl = (
  posterPath: string | null | undefined,
  fallbackImage: string = '/images/404img.jpg',
) => {
  return computed(() =>
    posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : fallbackImage,
  )
}
