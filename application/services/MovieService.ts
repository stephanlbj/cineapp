import type { Movie, MovieDetailsFull, MoviePage } from '~/domain/models/Movie'
import { ApiService } from '~/infrastructure/api/ApiService'
import type { FetchOptions } from '~/types/fetchOptions'
import type { MovieCredits } from '~/types/movies'

export const MovieService = {
  async fetchMovies(page: number, url: string, options: FetchOptions): Promise<MoviePage> {
    if (!options.params) {
      options.params = {}
    }
    options.params.page = page

    const response = await ApiService.fetchData<MoviePage>(url, options)
    return response
  },

  async searchMovies(
    query: string,
    { apiBaseUrl }: { apiBaseUrl: string; tmdbApiKey: string },
    options: FetchOptions = {},
  ): Promise<Movie[]> {
    if (!query) return []
    const url = new URL(`${apiBaseUrl}/search/movie`)
    url.searchParams.append('query', query)

    const response = await ApiService.fetchData<{ results: Movie[] }>(url.toString(), options)
    return response.results
  },

  async getMovieDetails(url: string, options: FetchOptions = {}): Promise<MovieDetailsFull | null> {
    return await ApiService.fetchData<MovieDetailsFull>(url, options)
  },

  async getMovieCredits(url: string, options: FetchOptions = {}): Promise<MovieCredits | null> {
    return await ApiService.fetchData<MovieCredits>(url, options)
  },
}
