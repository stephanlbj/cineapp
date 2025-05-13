import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import nock from 'nock'
import { MovieService } from '~/application/services/MovieService'
import type { MovieDetailsFull, MoviePage } from '~/domain/models/Movie'
import type { MovieCredits } from '~/types/movies'
import type { FetchOptions } from '~/types/fetchOptions'
import { baseUrl } from '~/constants'
import { movieEndpoints } from '~/infrastructure/api/movieEndpoints'

const mockMoviePage: MoviePage = {
  page: 1,
  results: [],
  total_pages: 1,
  total_results: 0,
}

const mockMovieDetailsFull: MovieDetailsFull = {
  adult: false,
  backdrop_path: '/test-backdrop.jpg',
  belongs_to_collection: {
    id: 1,
    name: 'Test Collection',
    poster_path: '/collection-poster.jpg',
    backdrop_path: '/collection-backdrop.jpg',
  },
  budget: 50000000,
  genres: [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Adventure' },
  ],
  homepage: 'https://www.testmovie.com',
  id: 1,
  imdb_id: 'tt1234567',
  origin_country: ['US'],
  original_language: 'en',
  original_title: 'Test Movie',
  overview: 'This is a test movie about adventure and action.',
  popularity: 123.45,
  poster_path: '/test-movie-poster.jpg',
  production_companies: [
    { id: 1, name: 'Test Studios', logo_path: '/test-logo.png', origin_country: 'US' },
  ],
  production_countries: [{ iso_3166_1: 'US', name: 'United States' }],
  release_date: '2025-01-01',
  revenue: 200000000,
  runtime: 120,
  spoken_languages: [
    { english_name: 'English', iso_639_1: 'en', name: 'English' },
    { english_name: 'French', iso_639_1: 'fr', name: 'Français' },
  ],
  status: 'Released',
  tagline: 'Adventure awaits!',
  title: 'Test Movie',
  video: false,
  vote_average: 7.5,
  vote_count: 1000,
}

const mockMovieCredits: MovieCredits = {
  id: 1,
  cast: [],
  crew: [],
}

const defaultOptions: FetchOptions = { params: { language: 'fr-FR' } }

beforeEach(() => {
  if (!nock.isActive()) nock.activate()
})

afterEach(() => {
  nock.cleanAll()
  nock.restore()
})

describe('MovieService', () => {
  it('fetchMovies ajoute le paramètre page et récupère les données correctement', async () => {
    nock(baseUrl)
      .get(movieEndpoints.popular)
      .query({ language: 'fr-FR', page: 1 })
      .reply(200, mockMoviePage)

    const result = await MovieService.fetchMovies(
      1,
      baseUrl + movieEndpoints.popular,
      defaultOptions,
    )

    expect(result).toEqual(mockMoviePage)
  })

  it('searchMovies retourne un objet vide si query est vide', async () => {
    const result = await MovieService.searchMovies(
      1,
      baseUrl + movieEndpoints.popular,
      defaultOptions,
      '',
    )

    expect(result).toEqual({})
  })

  it('searchMovies ajoute le paramètre page et récupère les données correctement si query est présent', async () => {
    nock(baseUrl)
      .get(movieEndpoints.popular)
      .query({ language: 'fr-FR', page: 1 })
      .reply(200, mockMoviePage)

    const result = await MovieService.searchMovies(
      1,
      baseUrl + movieEndpoints.popular,
      defaultOptions,
      'Inception',
    )

    expect(result).toEqual(mockMoviePage)
  })

  it('getMovieDetails récupère les détails du film correctement', async () => {
    nock(baseUrl).get(movieEndpoints.popular).query(true).reply(200, mockMovieDetailsFull)

    const result = await MovieService.getMovieDetails(
      baseUrl + movieEndpoints.popular,
      defaultOptions,
    )

    expect(result).toEqual(mockMovieDetailsFull)
  })

  it('getMovieCredits récupère les crédits du film correctement', async () => {
    nock(baseUrl).get(movieEndpoints.popular).query(true).reply(200, mockMovieCredits)

    const result = await MovieService.getMovieCredits(
      baseUrl + movieEndpoints.popular,
      defaultOptions,
    )

    expect(result).toEqual(mockMovieCredits)
  })
})
