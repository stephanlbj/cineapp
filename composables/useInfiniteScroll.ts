import type { Ref } from 'vue'
import type { InfiniteQueryObserverResult } from '@tanstack/vue-query'

export function useInfiniteScroll(
  loadMoreTrigger: Ref<HTMLElement | null>,
  hasNextPage: Ref<boolean | undefined>,
  isFetching: Ref<boolean>,
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>,
) {
  const observer = ref<IntersectionObserver | null>(null)
  const isLoadingMore = ref(false)

  watch(loadMoreTrigger, (el) => {
    if (!el) {
      console.warn("⚠️ Impossible de monter l'observer, loadMoreTrigger est null.")
      return
    }

    observer.value = new IntersectionObserver((entries) => {
      const isVisible = entries[0]?.isIntersecting
      if (isVisible && hasNextPage.value && !isFetching.value) {
        isLoadingMore.value = true
        fetchNextPage().finally(() => {
          isLoadingMore.value = false
        })
      }
    })
    observer.value.observe(el)
  })

  onUnmounted(() => {
    observer.value?.disconnect()
  })

  return {
    isLoadingMore,
  }
}
