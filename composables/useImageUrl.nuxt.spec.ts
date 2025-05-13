import { describe, it, expect } from 'vitest'
import { useImageUrl } from './useImageUrl'

describe('useImageUrl', () => {
  const defaultFallback = '/images/404img.jpg'
  const customFallback = '/images/custom-fallback.jpg'
  const validPosterPath = '/abcd1234.jpg'
  const expectedValidUrl = 'https://image.tmdb.org/t/p/w500/abcd1234.jpg'

  describe.each([
    {
      posterPath: validPosterPath,
      fallback: undefined,
      expected: expectedValidUrl,
      description: 'valide sans fallback',
    },
    {
      posterPath: validPosterPath,
      fallback: customFallback,
      expected: expectedValidUrl,
      description: 'valide avec fallback personnalisé',
    },
    {
      posterPath: null,
      fallback: undefined,
      expected: defaultFallback,
      description: 'null sans fallback',
    },
    {
      posterPath: undefined,
      fallback: undefined,
      expected: defaultFallback,
      description: 'undefined sans fallback',
    },
    {
      posterPath: null,
      fallback: customFallback,
      expected: customFallback,
      description: 'null avec fallback personnalisé',
    },
    {
      posterPath: undefined,
      fallback: customFallback,
      expected: customFallback,
      description: 'undefined avec fallback personnalisé',
    },
  ])('useImageUrl - $description', ({ posterPath, fallback, expected }) => {
    it(`devrait retourner ${expected} lorsque posterPath=${posterPath} et fallback=${fallback}`, () => {
      const result = useImageUrl(posterPath, fallback)
      expect(result.value).toBe(expected)
    })
  })
})
