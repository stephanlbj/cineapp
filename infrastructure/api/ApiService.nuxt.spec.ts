import type { FetchOptions } from '~/types/fetchOptions'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import nock from 'nock'
import { ApiService } from './ApiService'
import { movieEndpoints } from './movieEndpoints'
import { baseUrl } from '~/constants'
import type { Movie, MoviePage } from '~/domain/models/Movie'

const config = useRuntimeConfig()

const myMovie: Movie = {
  id: 123,
  title: 'Mon Film',
  original_title: 'My Movie',
  overview: 'Un film intéressant.',
  poster_path: '/chemin/vers/poster.jpg',
  backdrop_path: '/chemin/vers/backdrop.jpg',
  genre_ids: [1, 2, 3],
  release_date: '2024-01-01',
  popularity: 150.25,
  vote_average: 7.5,
  vote_count: 1000,
  original_language: 'fr',
  adult: false,
  video: false,
}

const mockMoviePage: MoviePage = {
  page: 1,
  results: [myMovie],
  total_pages: 1,
  total_results: 1,
}

const mockError = { message: 'Erreur réseau simulée' }

const mockOptions: FetchOptions = {
  method: 'GET',
  params: {
    api_key: config.public.tmdbApiKey,
    language: 'fr-FR',
    page: 1,
  },
}

beforeAll(() => {
  if (!nock.isActive()) nock.activate()
})

afterAll(() => {
  nock.cleanAll()
  nock.restore()
})

describe('ApiService avec Nock', () => {
  it('devrait récupérer les films populaires avec succès', async () => {
    nock(baseUrl)
      .get(movieEndpoints.popular)
      .query({
        api_key: config.public.tmdbApiKey,
        language: 'fr-FR',
        page: 1,
      })
      .reply(200, mockMoviePage)

    const result = await ApiService.fetchData(baseUrl + movieEndpoints.popular, mockOptions)

    expect(result).toEqual(mockMoviePage)
  })

  it('devrait gérer une erreur réseau de type 500', async () => {
    nock(baseUrl).get(movieEndpoints.popular).query(true).reply(500, mockError)

    await expect(
      ApiService.fetchData(baseUrl + movieEndpoints.popular, mockOptions),
    ).rejects.toThrow('Erreur lors de la récupération des données')
  })

  it('devrait appeler $fetch sans options si elles ne sont pas fournies', async () => {
    nock(baseUrl).get(movieEndpoints.popular).reply(200, mockMoviePage)

    const result = await ApiService.fetchData(baseUrl + movieEndpoints.popular)

    expect(result).toEqual(mockMoviePage)
  })
})
