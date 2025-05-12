import { useScrollStore } from '~/stores/useScrollStore'
import { useRouter } from 'vue-router'

export default defineNuxtPlugin(() => {
  const scrollStore = useScrollStore()
  const router = useRouter()

  if (import.meta.client) {
    window.addEventListener('beforeunload', () => {
      scrollStore.savePosition(router.currentRoute.value.fullPath, window.scrollY)
    })

    router.beforeEach((to, from) => {
      scrollStore.savePosition(from.fullPath, window.scrollY)
    })

    router.afterEach((to) => {
      if (to.fullPath === '/') {
        const savedPosition = scrollStore.getPosition(to.fullPath)

        setTimeout(() => {
          window.scrollTo({
            top: savedPosition,
            behavior: 'auto',
          })
        }, 100)
      }
    })
  }
})
