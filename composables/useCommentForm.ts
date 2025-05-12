import { ref, onMounted } from 'vue'
import type { Comment, FormData } from '~/types/comments'
import type { VForm } from 'vuetify/components'
import { useCommentStore } from '~/stores/useCommentStore'
import { useToast } from 'vue-toastification'
import { useUsernameStore } from '~/stores/useUsernameStore'
import { useValidationRules } from '~/composables/useValidationRules'

export function useCommentForm(movieId: number) {
  const toast = useToast()
  const commentStore = useCommentStore()
  const userName = useUsernameStore()

  const { nameRules, messageRules, ratingRules } = useValidationRules()

  const formData: Ref<FormData> = ref({
    username: '',
    message: '',
    movieRating: null,
  })
  const formRef = ref<VForm | null>(null)

  const isLoading = ref(false)
  const isUsernameLocked = ref(false)

  const isNameValid = computed(() =>
    nameRules.every((rule) => rule(formData.value.username) === true),
  )
  const isMessageValid = computed(() =>
    messageRules.every((rule) => rule(formData.value.message) === true),
  )
  const isRatingValid = computed(() =>
    ratingRules.every((rule) => rule(formData.value.movieRating as number) === true),
  )

  const isFormValid = computed(
    () => isNameValid.value && isMessageValid.value && isRatingValid.value,
  )

  onMounted(() => {
    userName.loadUsername()
    if (userName.username) {
      formData.value.username = userName.username
      isUsernameLocked.value = true
    }
  })

  const onSubmit = async () => {
    if (!isFormValid.value) return
    isLoading.value = true
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newComment: Comment = {
      movieId,
      username: userName.username || formData.value.username,
      message: formData.value.message,
      movieRating: formData.value.movieRating,
      timestamp: Date.now(),
    }

    commentStore.addComment(newComment)
    userName.addUserName(formData.value.username)
    toast.success('Commentaire ajouté avec succès !')
    formRef.value?.resetValidation()
    formData.value = { username: userName.username || '', message: '', movieRating: null }
    isLoading.value = false
    isUsernameLocked.value = !!userName.username
  }

  return {
    formData,
    formRef,
    isLoading,
    isUsernameLocked,
    nameRules,
    messageRules,
    ratingRules,
    isFormValid,
    onSubmit,
  }
}
