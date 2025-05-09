import { defineEventHandler } from 'h3'
import { z } from 'zod'
import { MovieService } from '~/application/services/MovieService'
import { validateRouterParams } from '~/server/utils/validateRouterParams'
import type { FetchOptions } from '~/types/fetchOptions'
import type { Movie } from '@/domain/models/Movie'

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

  try {
    const movieDetails: Movie | null = await MovieService.getMovieDetails(
      validatedParams.id,
      publicConfig,
      options,
    )
    return movieDetails
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Impossible de récupérer les détails du film ${error}`,
    })
  }
})
