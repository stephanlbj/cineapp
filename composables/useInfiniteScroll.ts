import { onMounted, ref, onUnmounted, type Ref } from 'vue'
import type { InfiniteQueryObserverResult } from '@tanstack/vue-query'

export function useInfiniteScroll(
  loadMoreTrigger: Ref<HTMLElement | null>,
  hasNextPage: Ref<boolean | undefined>,
  isFetching: Ref<boolean>,
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>,
) {
  const observer = ref<IntersectionObserver | null>(null)
  const isLoadingMore = ref(false)

  const observeElement = () => {
    if (!loadMoreTrigger.value) {
      console.warn("⚠️ Impossible de monter l'observer, loadMoreTrigger est null.")
      return
    }

    observer.value = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0]?.isIntersecting
        if (isVisible && hasNextPage.value && !isFetching.value && !isLoadingMore.value) {
          isLoadingMore.value = true
          fetchNextPage().finally(() => {
            isLoadingMore.value = false
          })
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.1,
      },
    )

    observer.value.observe(loadMoreTrigger.value)
  }

  onMounted(() => {
    if (import.meta.client) {
      if (loadMoreTrigger.value) {
        observeElement()
      } else {
        setTimeout(() => {
          if (loadMoreTrigger.value) {
            observeElement()
          }
        }, 100)
      }
    }
  })

  onUnmounted(() => {
    observer.value?.disconnect()
  })
  return {
    isLoadingMore,
  }
}
