export function useHydrationState() {
  const isHydrated = ref(false)
  onMounted(() => {
    isHydrated.value = true
  })
  return {
    isHydrated,
  }
}
