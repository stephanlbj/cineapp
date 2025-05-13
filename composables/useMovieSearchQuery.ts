import { useInfiniteQuery } from '@tanstack/vue-query'
import { MovieService } from '~/application/services/MovieService'
import type { Movie, MoviePage } from '~/domain/models/Movie'
import type { FetchOptions } from '~/types/fetchOptions'

export function useMovieSearchQuery(
  url: string,
  optionsWithConfig: FetchOptions,
  searchQuery: string,
) {
  const searchValue = ref(searchQuery)

  const queryKey = computed(() => ['movies-search', searchValue.value])

  const { data, fetchNextPage, hasNextPage, isFetching, error, refetch } = useInfiniteQuery<
    MoviePage,
    Error
  >({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const page = typeof pageParam === 'number' ? pageParam : 1
        return await MovieService.searchMovies(page, url, optionsWithConfig, searchQuery)
      } catch (error) {
        console.error("Erreur lors de l'appel API :", error)
        throw error
      }
    },
    getNextPageParam: (lastPage, pages) => {
      return pages.length < lastPage.total_pages ? pages.length + 1 : undefined
    },
    staleTime: 1000 * 60 * 5,
    initialPageParam: 1,
    enabled: computed(() => searchQuery.trim().length > 0).value,
  })

  const formattedPosts = computed<Movie[]>(() => {
    return (data.value?.pages ?? [])
      .flatMap((page) => page?.results ?? [])
      .map((item) => JSON.parse(JSON.stringify(item)))
  })

  const isEmpty = computed(() => formattedPosts.value.length === 0 && !isFetching.value)

  return {
    formattedPosts,
    fetchNextPage,
    hasNextPage,
    isFetching,
    error,
    isEmpty,
    refetch,
  }
}
