import { computed } from 'vue'

export const useFormattedText = (text: string) => {
  return computed(() => {
    if (!text) {
      return 'Aucun texte disponible'
    }

    const isMobile = window.innerWidth <= 640
    const maxLength = isMobile ? 50 : 20
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
  })
}
