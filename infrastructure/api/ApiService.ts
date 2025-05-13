import type { FetchOptions } from '~/types/fetchOptions'
import { $fetch } from 'ofetch'

export const ApiService = {
  async fetchData<T>(url: string, options: FetchOptions = {}): Promise<T> {
    try {
      const response = await $fetch<T>(url, options)
      return response
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Erreur lors de la récupération des données`)
      } else {
        throw new Error('Erreur inconnue lors de la récupération des données.')
      }
    }
  },
}
