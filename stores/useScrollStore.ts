import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useScrollStore = defineStore('scrollStore', () => {
  const positions = ref<Record<string, number>>({})

  const savePosition = (route: string, position: number) => {
    if (typeof window !== 'undefined') {
      positions.value[route] = position
      localStorage.setItem('scrollPositions', JSON.stringify(positions.value))
    }
  }

  const getPosition = (route: string): number => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('scrollPositions')
      if (stored) {
        positions.value = JSON.parse(stored)
      }
    } else {
      console.log('[getPosition] — Non exécuté côté client')
    }
    return positions.value[route] || 0
  }

  return { positions, savePosition, getPosition }
})
