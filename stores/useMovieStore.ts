import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { MovieDetailsResponse } from '~/domain/models/Movie'

export const useMovieStore = defineStore('movieStore', () => {
  const movies = ref<Map<number, MovieDetailsResponse>>(new Map())

  const addMovieToCache = (id: number, movieData: MovieDetailsResponse) => {
    if (!movies.value.has(id)) {
      movies.value.set(id, movieData)
    }
  }

  const getMovieFromCache = (id: number): MovieDetailsResponse | undefined => {
    return movies.value.get(id)
  }

  return {
    movies,
    addMovieToCache,
    getMovieFromCache,
  }
})
