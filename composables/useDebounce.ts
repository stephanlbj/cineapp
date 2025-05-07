import { ref, watch } from "vue";

export function useDebounce(value: string, delay: number = 500) {
  const inputValue = ref(value);
  const debouncedValue = ref(value);
  let timeout: ReturnType<typeof setTimeout>;

  watch(inputValue, (newValue) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      debouncedValue.value = newValue;
    }, delay);
  });

  inputValue.value = value;

  return debouncedValue;
}
