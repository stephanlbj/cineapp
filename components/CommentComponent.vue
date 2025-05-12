<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Comment, FormData } from '~/types/comments'
import type { VForm } from 'vuetify/components'
import { useCommentStore } from '~/stores/useCommentStore'
import { useToast } from 'vue-toastification'
import { useUsernameStore } from '~/stores/useUsernameStore'

const props = defineProps({
  movieId: {
    type: Number,
    required: true,
  },
})
const toast = useToast()
const commentStore = useCommentStore()
const userName = useUsernameStore()

const formData: Ref<FormData> = ref({
  username: '',
  message: '',
  movieRating: null,
})
const formRef = ref<VForm | null>(null)

const isLoading = ref(false)
const isUsernameLocked = ref(false)

const nameRules = [
  (value: string) => !!value || "Le nom d'utilisateur est requis.",
  (value: string) =>
    /^[a-zA-Z]+$/.test(value) || "Le nom d'utilisateur doit contenir uniquement des lettres.",
  (value: string) =>
    (value && value.length >= 3) || "Le nom d'utilisateur doit contenir au moins 3 caractères.",
  (value: string) =>
    (value && value.length <= 50) || "Le nom d'utilisateur ne doit pas dépasser 50 caractères.",
]

const messageRules = [
  (value: string) => !!value || 'Le message est requis.',
  (value: string) =>
    /^[a-zA-Z0-9\s'.,?!-]+$/.test(value) ||
    'Le message doit être alphanumérique (lettres, chiffres, espaces et certains caractères spéciaux).',
  (value: string) =>
    (value && value.length >= 3) || 'Le message doit contenir au moins 3 caractères.',
  (value: string) =>
    (value && value.length <= 500) || 'Le message ne doit pas dépasser 500 caractères.',
]

const ratingRules = [
  (value: number) => value !== null || 'La note du film est requise.',
  (value: number) =>
    (Number.isInteger(value) && value >= 1 && value <= 10) ||
    'La note doit être un nombre entier entre 1 et 10.',
]

const isNameValid = computed(() =>
  nameRules.every((rule) => rule(formData.value.username) === true),
)
const isMessageValid = computed(() =>
  messageRules.every((rule) => rule(formData.value.message) === true),
)
const isRatingValid = computed(() =>
  ratingRules.every((rule) => rule(formData.value.movieRating as number) === true),
)

const isFormValid = computed(() => isNameValid.value && isMessageValid.value && isRatingValid.value)

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
    movieId: props.movieId,
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
</script>

<template>
  <div class="mt-20 w-full lg:w-8/12 text-base md:text-xl">
    <div class="mt-10">
      <v-container class="w-full">
        <v-row justify="center">
          <v-col cols="12">
            <v-card class="w-full border-none">
              <v-card-title>Commentaires</v-card-title>
              <v-card-text>
                <v-form ref="formRef" @submit.prevent="onSubmit">
                  <v-text-field
                    v-model="formData.username"
                    label="Nom d'utilisateur:"
                    type="text"
                    required
                    :rules="nameRules"
                    class="border-none"
                    :disabled="isUsernameLocked"
                  />

                  <v-textarea
                    v-model="formData.message"
                    label="Message"
                    type="text"
                    required
                    :rules="messageRules"
                  />

                  <v-text-field
                    v-model.number="formData.movieRating"
                    label="Note du film (1-10):"
                    type="number"
                    required
                    :rules="ratingRules"
                    min="1"
                    max="10"
                  />

                  <v-btn
                    type="submit"
                    :color="isFormValid ? 'primary' : ''"
                    block
                    :loading="isLoading"
                    :disabled="!isFormValid"
                  >
                    Envoyer
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.disabled-input {
  pointer-events: none;
}
</style>
