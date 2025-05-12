<script setup lang="ts">
import { useAttrs, ref, watch } from 'vue'

type ValidationRule<T> = (value: T) => boolean | string

const {
  disabled,
  label,
  modelValue: propModelValue,
  rules,
  type,
  variant,
  rounded,
  prependInnerIcon,
  hideDetails,
} = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: undefined,
  },
  rules: {
    type: Array<ValidationRule<string> | ValidationRule<number>>,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String as PropType<'outlined' | 'solo' | 'underlined' | 'filled'>,
    default: 'solo',
  },
  rounded: {
    type: [Boolean, String],
    default: false,
  },
  prependInnerIcon: {
    type: String,
    default: undefined,
  },
  hideDetails: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
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
  <v-text-field
    v-model="localModelValue"
    :label="label"
    :type="type"
    :rules="rules"
    :disabled="disabled"
    class="border-none"
    v-bind="attrs"
    :variant="variant"
    :rounded="rounded"
    :prepend-inner-icon="prependInnerIcon"
    :hide-details="hideDetails"
  />
</template>
