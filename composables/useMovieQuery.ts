import { useInfiniteQuery } from "@tanstack/vue-query";
import { MovieService } from "@/services/MovieService";
import type { MoviePage } from "~/domain/models/Movie";

export function useMovieQuery() {
  const { data: initialData } = useAsyncData("movies", () =>
    MovieService.fetchMovies(1),
  );

  const query = useInfiniteQuery<MoviePage, Error>({
    queryKey: ["movies"],
    queryFn: async ({ pageParam = 1 }) => {
      const page = typeof pageParam === "number" ? pageParam : 1;
      return await MovieService.fetchMovies(page);
    },
    getNextPageParam: (lastPage, pages) => {
      return pages.length < lastPage.total_pages ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
    initialData: initialData.value
      ? {
          pages: [initialData.value],
          pageParams: [1],
        }
      : undefined,
  });

  return query;
}
