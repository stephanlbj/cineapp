import { defineStore } from 'pinia'

export const useScrollStore = defineStore('scrollStore', {
  state: () => ({
    positions: {} as Record<string, number>,
  }),
  actions: {
    savePosition(route: string, position: number) {
      if (import.meta.client) {
        this.positions[route] = position
        localStorage.setItem('scrollPositions', JSON.stringify(this.positions))
      }
    },
    getPosition(route: string): number {
      if (import.meta.client) {
        const stored = localStorage.getItem('scrollPositions')
        if (stored) {
          this.positions = JSON.parse(stored)
        }
      } else {
        console.log('[getPosition] — Non exécuté côté client')
      }
      return this.positions[route] || 0
    },
  },
})
