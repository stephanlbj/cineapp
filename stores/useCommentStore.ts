import { defineStore } from 'pinia'
import type { Comment } from '~/types/comments'
import { COMMENTS_KEY } from '~/constants'

export const useCommentStore = defineStore('comments', () => {
  const comments = ref<Comment[]>([])

  const loadComments = (movieId: number): void => {
    if (typeof window !== 'undefined') {
      const storedComments = window.localStorage.getItem(COMMENTS_KEY)
      if (storedComments) {
        try {
          const parsedComments: Comment[] = JSON.parse(storedComments)
          comments.value = parsedComments
            .filter((comment) => comment.movieId === movieId)
            .sort((a, b) => b.timestamp - a.timestamp)
        } catch (error: unknown) {
          console.error('Erreur lors de la lecture des commentaires depuis le localStorage:', error)
        }
      }
    }
  }

  const addComment = (newComment: Comment): void => {
    if (typeof window !== 'undefined') {
      const storedComments = window.localStorage.getItem(COMMENTS_KEY)
      const existingComments: Comment[] = storedComments ? JSON.parse(storedComments) : []
      existingComments.push(newComment)
      window.localStorage.setItem(COMMENTS_KEY, JSON.stringify(existingComments))
      comments.value = [newComment, ...comments.value].sort((a, b) => b.timestamp - a.timestamp)
    }
  }

  return { comments, loadComments, addComment }
})
