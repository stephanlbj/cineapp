import { useInfiniteQuery } from '@tanstack/vue-query'
import { MovieService } from '~/application/services/MovieService'
import type { MoviePage } from '~/domain/models/Movie'
import type { FetchOptions } from '~/types/fetchOptions'

export function useMovieQuery(optionsWithConfig: FetchOptions, apiBaseUrl: string) {
  const { data: initialData } = useAsyncData(
    'movies',
    () => MovieService.fetchMovies(1, apiBaseUrl, optionsWithConfig),
    {
      server: true,
    },
  )

  const { data, fetchNextPage, hasNextPage, isFetching, error, refetch } = useInfiniteQuery<
    MoviePage,
    Error
  >({
    queryKey: ['movies'],
    queryFn: async ({ pageParam = 1 }) => {
      const page = typeof pageParam === 'number' ? pageParam : 1
      if (page === 1 && initialData.value) {
        return initialData.value
      } else {
        return await MovieService.fetchMovies(page, apiBaseUrl, optionsWithConfig)
      }
    },
    getNextPageParam: (lastPage, pages) => {
      return pages.length < lastPage.total_pages ? pages.length + 1 : undefined
    },
    staleTime: 1000 * 60 * 5,
    initialPageParam: 1,
    initialData: initialData.value
      ? {
          pages: [initialData.value],
          pageParams: [1],
        }
      : undefined,
  })

  const formattedPosts = computed(() => data?.value?.pages?.flatMap((page) => page.results) ?? [])
  const isEmpty = computed(() => formattedPosts.value.length === 0 && !isFetching.value)

  return {
    formattedPosts,
    fetchNextPage,
    hasNextPage,
    isFetching,
    error,
    refetch,
    isEmpty,
  }
}
