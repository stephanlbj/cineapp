<script setup lang="ts">
import type { Comment } from '~/types/comments'
import { useDateFormatter } from '~/composables/useDateFormatter'

const props = defineProps({
  comment: {
    type: Object as PropType<Comment>,
    required: true,
  },
})

const { formatDate } = useDateFormatter()
const isExpanded = ref(false)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="flex items-center justify-between mb-2">
      <div class="font-semibold text-gray-700">{{ props.comment.username }}</div>
      <span class="text-sm text-red-500"> ({{ props.comment.movieRating }}/10) </span>
    </div>
    <div
      class="space-y-2 overflow-y-hidden relative transition-all duration-700 ease-[cubic-bezier(0.25, 0.8, 0.25, 1)] delay-75"
      :style="{ maxHeight: isExpanded ? '500px' : '60px' }"
    >
      <p class="text-gray-500 text-[clamp(0.8rem,1.2vw,1rem)] mb-1">
        {{ props.comment.message }}
      </p>
      <div
        v-if="!isExpanded && props.comment.message && props.comment.message.length > 100"
        class="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"
      />
    </div>
    <button
      v-if="props.comment.message && props.comment.message.length > 100"
      class="text-[#032441] underline focus:outline-none cursor-pointer text-sm mt-1"
      @click="toggleExpand"
    >
      {{ isExpanded ? 'Voir moins' : 'Voir plus' }}
    </button>
    <div class="mt-2 text-sm text-gray-600">
      Publié le {{ formatDate(props.comment.timestamp) }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg-white {
  background-color: #ffffff;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow-md {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.p-6 {
  padding: 1.5rem;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.font-semibold {
  font-weight: 600;
}

.text-gray-700 {
  color: #4a5568;
}

.text-sm {
  font-size: 0.875rem;
}

.text-gray-500 {
  color: #718096;
}

.text-gray-800 {
  color: #2d3748;
}

.leading-relaxed {
  line-height: 1.625;
}

.mt-2 {
  margin-top: 0.5rem;
}

.text-gray-600 {
  color: #5e6c7c;
}
</style>
