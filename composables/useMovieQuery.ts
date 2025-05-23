import { useInfiniteQuery } from '@tanstack/vue-query'
import { MovieService } from '~/application/services/MovieService'
import type { MoviePage } from '~/domain/models/Movie'
import type { FetchOptions } from '~/types/fetchOptions'

export function useMovieQuery(optionsWithConfig: FetchOptions, apiBaseUrl: string) {
  const initialSSRData = useState<MoviePage | null>(`movies-page-1-ssr`)

  onServerPrefetch(async () => {
    const { data } = await useAsyncData(
      `movies-page-1-ssr`,
      () => MovieService.fetchMovies(1, apiBaseUrl, optionsWithConfig),
      {
        server: true,
      },
    )
    initialSSRData.value = data.value
  })

  const { data, fetchNextPage, hasNextPage, isFetching, error, refetch } = useInfiniteQuery<
    MoviePage,
    Error
  >({
    queryKey: ['movies'],
    queryFn: async ({ pageParam = 1 }) => {
      const page = typeof pageParam === 'number' ? pageParam : 1
      return await MovieService.fetchMovies(page, apiBaseUrl, optionsWithConfig)
    },
    getNextPageParam: (lastPage, pages) => {
      return pages.length < lastPage.total_pages ? pages.length + 1 : undefined
    },
    staleTime: 1000 * 60 * 5,
    initialPageParam: 1,
    initialData: initialSSRData.value
      ? {
          pages: [initialSSRData.value],
          pageParams: [1],
        }
      : undefined,
  })
  const formattedPosts = computed(() => {
    return data?.value?.pages?.flatMap((page) => page.results) ?? []
  })
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
