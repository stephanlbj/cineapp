<script setup lang="ts">
import { useCommentStore } from '~/stores/useCommentStore'
import { onMounted } from 'vue'
const props = defineProps({
  movieId: {
    type: Number,
    required: true,
  },
})

const commentStore = useCommentStore()

onMounted(() => {
  commentStore.loadComments(props.movieId)
})
</script>
<template>
  <div v-if="commentStore.comments.length > 0" class="mt-6">
    <h2 class="text-xl font-semibold text-[#032441] mb-4">Avis des spectateurs</h2>
    <ul class="space-y-4">
      <CommentItem
        v-for="comment in commentStore.comments"
        :key="comment.timestamp"
        :comment="comment"
      />
    </ul>
  </div>
  <div v-else class="text-gray-600 italic">
    Aucun avis pour le moment. Soyez le premier à commenter !
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

.mb-2 {
  margin-bottom: 0.5rem;
}

.font-semibold {
  font-weight: 600;
}

.text-gray-700 {
  color: #4a5568;
}

.ml-2 {
  margin-left: 0.5rem;
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

.italic {
  font-style: italic;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}
</style>
