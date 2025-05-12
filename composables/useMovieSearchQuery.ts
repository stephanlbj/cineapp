import { useInfiniteQuery } from '@tanstack/vue-query'
import { MovieService } from '~/application/services/MovieService'
import type { MoviePage } from '~/domain/models/Movie'
import type { FetchOptions } from '~/types/fetchOptions'

export function useMovieSearchQuery(
  url: string,
  optionsWithConfig: FetchOptions,
  searchQuery: string,
) {
  const { data, fetchNextPage, hasNextPage, isFetching, error, refetch } = useInfiniteQuery<
    MoviePage,
    Error
  >({
    queryKey: ['movies-search', searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const page = typeof pageParam === 'number' ? pageParam : 1
      return await MovieService.searchMovies(page, url, optionsWithConfig, searchQuery)
    },
    getNextPageParam: (lastPage, pages) => {
      return pages.length < lastPage.total_pages ? pages.length + 1 : undefined
    },

    staleTime: 1000 * 60 * 5,
    initialPageParam: 1,
  })

  const formattedPosts = computed(() => {
    return data?.value?.pages?.flatMap((page) => page?.results) ?? []
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
