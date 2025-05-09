import { getRouterParams, createError } from 'h3'
import type { H3Event } from 'h3'
import type { z } from 'zod'
import { ZodError } from 'zod'

export async function validateRouterParams<T extends z.ZodRawShape>(
  event: H3Event,
  schema: z.ZodObject<T>,
): Promise<z.infer<z.ZodObject<T>>> {
  try {
    const params = getRouterParams(event)
    return schema.parse(params) as z.infer<z.ZodObject<T>>
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid Router Parameters',
        data: error.issues,
      })
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        data: 'An unexpected error occurred',
      })
    }
  }
}
