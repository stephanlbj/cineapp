import { useInfiniteQuery } from "@tanstack/vue-query";
import { MovieService } from "@/services/MovieService";
import type { MoviePage } from "~/domain/models/Movie";

export function useMovieQuery() {
  return useInfiniteQuery<MoviePage, Error>({
    queryKey: ["movies"],
    queryFn: async ({ pageParam = 1 }) => {
      console.log("Fetching movies on SSR...");
      const page = typeof pageParam === "number" ? pageParam : 1;
      return await MovieService.fetchMovies(page);
    },
    getNextPageParam: (lastPage, pages) => {
      return pages.length < lastPage.total_pages ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
}
