import { defineEventHandler } from 'h3'
import { z } from 'zod'
import { MovieService } from '~/application/services/MovieService'
import type { Cast, Genre } from '~/domain/models/Movie'
import { validateRouterParams } from '~/server/utils/validateRouterParams'
import type { FetchOptions } from '~/types/fetchOptions'
import type { Crew } from '~/types/movies'
import { movieEndpoints } from '~/infrastructure/api/movieEndpoints'

const paramsSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number),
})

export default defineEventHandler(async (event) => {
  const validatedParams = await validateRouterParams(event, paramsSchema)
  const config = useRuntimeConfig(event)
  const publicConfig = config.public
  const accessToken = config.tmdbAccessToken

  const options: FetchOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      language: 'fr-FR',
    },
  }

  const movieDetailUrl = `${publicConfig.apiBaseUrl}${movieEndpoints.details}${validatedParams.id}`
  const movieCreditUrl = `${publicConfig.apiBaseUrl}${movieEndpoints.credits}${validatedParams.id}/credits`

  try {
    const [movieInfos, movieCredits] = await Promise.all([
      MovieService.getMovieDetails(movieDetailUrl, options),
      MovieService.getMovieCredits(movieCreditUrl, options),
    ])

    if (!movieInfos) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Film non trouvé',
      })
    }

    const castList: Cast[] = movieCredits && movieCredits.cast ? movieCredits.cast : []
    const crewList: Crew[] = movieCredits && movieCredits.crew ? movieCredits.crew : []

    const stars =
      castList
        .sort((a: Cast, b: Cast) => a.order - b.order)
        .map((actor: Cast) => actor.name)
        .join(', ') || 'Non disponibles'

    const director =
      crewList
        .filter((member: Crew) => member.job === 'Director')
        .map((director) => director.name)
        .join(', ') || 'Non disponibles'

    const categories =
      movieInfos.genres && movieInfos.genres.length > 0
        ? movieInfos.genres.map((genre: Genre) => genre.name).join(', ')
        : 'Non disponibles'

    const noteTMDB = movieInfos.vote_average ?? 'Non disponible'
    const nombreVotants = movieInfos.vote_count ?? 'Non disponible'

    return {
      ...movieInfos,
      director,
      stars,
      categories,
      noteTMDB,
      nombreVotants,
    }
  } catch (error) {
    if (error instanceof Error) {
      throw createError({
        statusCode: 500,
        statusMessage: `Impossible de récupérer les détails du film: ${error.message}`,
      })
    } else {
      throw createError({
        statusCode: 500,
        statusMessage:
          'Une erreur inconnue est survenue lors de la récupération des détails du film.',
      })
    }
  }
})
