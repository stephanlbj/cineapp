import { describe, it, expect } from 'vitest'
import { useDateFormatter } from './useDateFormatter'

describe('useDateFormatter', () => {
  const { formatDate } = useDateFormatter()

  const testCases = [
    {
      input: '2025-01-01',
      format: 'MMM dd, yyyy',
      expected: 'Jan 01, 2025',
    },
    {
      input: '2025-01-01',
      format: 'yyyy-MM-dd',
      expected: '2025-01-01',
    },
    {
      input: 'invalid-date',
      format: 'MMM dd, yyyy',
      expected: 'Date inconnue',
    },
    {
      input: 1672531199000,
      format: 'MMM dd, yyyy',
      expected: 'Dec 31, 2022',
    },
    {
      input: new Date('2025-01-01'),
      format: 'MMM dd, yyyy',
      expected: 'Jan 01, 2025',
    },
    {
      input: new Date('invalid-date'),
      format: 'MMM dd, yyyy',
      expected: 'Date inconnue',
    },
  ]

  testCases.forEach(({ input, format, expected }) => {
    it(`devrait formater correctement ${JSON.stringify(input)} en format ${format}`, () => {
      const result = formatDate(input, format)
      expect(result).toBe(expected)
    })
  })
})
