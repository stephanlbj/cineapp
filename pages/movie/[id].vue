<template>
  <div class="w-full mx-auto">
    <button class="back-button" aria-label="Retour à la liste des films" @click="goBack">
      ⬅️ Retour
    </button>
    <!-- <div v-if="pending">Chargement des détails du film...</div>
    <div v-else-if="error">Erreur : {{ error.message }}</div>
    <div v-else-if="data">
      <h1>{{ data.title }}</h1>
      <p>{{ data.overview }}</p>
      <p>Date de sortie : {{ data.release_date }}</p>
    </div>
    <div v-else>
      <p>Aucun détail de film trouvé.</p>
    </div>  -->
    <p>{{ data }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter, useAsyncData } from 'nuxt/app'
import { ref } from 'vue'
import type { Movie } from '~/domain/models/Movie'

const route = useRoute()
const router = useRouter()
const movieId = ref<number>(Number(route.params.id))

const { data, error } = useAsyncData(
  'movieDetails',
  async () => {
    return await $fetch<Movie>(`/api/movieDetails/${movieId.value}`)
  },
  {
    watch: [movieId],
    server: true,
  },
)

if (error.value) {
  console.error('Erreur lors de la récupération des détails du film:', error.value)
}

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.back-button {
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>
