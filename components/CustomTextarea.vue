<script setup lang="ts">
import { useAttrs, ref, watch } from 'vue'

type ValidationRule<T> = (value: T) => boolean | string

const {
  disabled,
  label,
  modelValue: propModelValue,
  rules,
} = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  rules: {
    type: Array<ValidationRule<string>>,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const attrs = useAttrs()

const localModelValue = ref(propModelValue)

watch(localModelValue, (newValue) => {
  emit('update:modelValue', newValue)
})

watch(
  () => propModelValue,
  (newValue) => {
    localModelValue.value = newValue
  },
)
</script>

<template>
  <v-textarea
    v-model="localModelValue"
    :label="label"
    :rules="rules"
    :disabled="disabled"
    class="border-none"
    v-bind="attrs"
  />
</template>
