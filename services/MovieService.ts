import type { Movie } from "@/domain/models/Movie";
import type { MoviePage } from "~/domain/models/Movie";

const getApiConfig = () => {
  const config = useRuntimeConfig();
  return {
    apiBaseUrl: config.public.apiBaseUrl,
    apiKey: config.public.tmdbApiKey,
  };
};

export const MovieService = {
  async fetchMovies(page: number): Promise<MoviePage> {
    try {
      const { apiBaseUrl, apiKey } = getApiConfig();
      const response = await $fetch<MoviePage>(`${apiBaseUrl}/movie/popular`, {
        method: "GET",
        params: {
          api_key: apiKey,
          language: "fr-FR",
          page,
        },
      });

      return {
        results: response.results,
        total_pages: response.total_pages,
        total_results: response.total_results,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(
          `Erreur lors de la récupération des films: ${error.message}`,
        );
      } else {
        throw new Error("Erreur inconnue lors de la récupération des films");
      }
    }
  },
  async searchMovies(query: string): Promise<Movie[]> {
    if (!query) return [];

    try {
      const { apiBaseUrl, apiKey } = getApiConfig();
      const response = await $fetch<{ results: Movie[] }>(
        `${apiBaseUrl}/search/movie`,
        {
          method: "GET",
          params: {
            query,
            api_key: apiKey,
            language: "fr-FR",
          },
        },
      );
      return response.results;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(
          `Erreur lors de la récupération des films: ${error.message}`,
        );
      } else {
        throw new Error("Erreur inconnue lors de la récupération des films.");
      }
    }
  },

  async getMovieDetails(id: number): Promise<Movie | null> {
    try {
      const { apiBaseUrl, apiKey } = getApiConfig();
      return await $fetch(`${apiBaseUrl}/movie/${id}`, {
        method: "GET",
        params: {
          api_key: apiKey,
          language: "fr-FR",
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(
          `Erreur lors de la récupération des détails du film: ${error.message}`,
        );
      } else {
        throw new Error(
          "Erreur inconnue lors de la récupération des détails du film.",
        );
      }
    }
  },
};
