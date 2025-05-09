import { ref } from 'vue'
import { MovieService } from '~/application/services/MovieService'
import type { Movie } from '~/domain/models/Movie'

export function useMovies() {
  const films = ref<Movie[]>([])
  const filmDetails = ref<Movie | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const searchMovies = async (query: string) => {
    loading.value = true
    error.value = null
    try {
      films.value = await MovieService.searchMovies(query)
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'Erreur inconnue lors de la récupération des films.'
      }
      films.value = []
    } finally {
      loading.value = false
    }
  }

  const getMovieDetails = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      filmDetails.value = await MovieService.getMovieDetails(id)
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'Erreur inconnue lors de la récupération des détails du film.'
      }
      filmDetails.value = null
    } finally {
      loading.value = false
    }
  }

  return {
    films,
    filmDetails,
    loading,
    error,
    searchMovies,
    getMovieDetails,
  }
}
