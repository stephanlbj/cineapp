<script setup lang="ts">
import { useCommentForm } from '~/composables/useCommentForm'

const props = defineProps({
  movieId: {
    type: Number,
    required: true,
  },
})

const {
  formData,
  formRef,
  isLoading,
  isUsernameLocked,
  nameRules,
  messageRules,
  ratingRules,
  isFormValid,
  onSubmit,
} = useCommentForm(props.movieId)
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
