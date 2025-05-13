import type { MovieDetailsFull, MoviePage } from '~/domain/models/Movie'
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
    page: number,
    url: string,
    options: FetchOptions = {},
    query: string,
  ): Promise<MoviePage> {
    if (!query) return {} as MoviePage

    if (!options.params) {
      options.params = {}
    }
    options.params.page = page

    const newUrl = url + query

    const response = await ApiService.fetchData<MoviePage>(newUrl, options)
    return response
  },

  async getMovieDetails(url: string, options: FetchOptions = {}): Promise<MovieDetailsFull | null> {
    return await ApiService.fetchData<MovieDetailsFull>(url, options)
  },

  async getMovieCredits(url: string, options: FetchOptions = {}): Promise<MovieCredits | null> {
    return await ApiService.fetchData<MovieCredits>(url, options)
  },
}
