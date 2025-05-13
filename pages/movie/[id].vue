<script setup lang="ts">
import { useRoute, useRouter, useAsyncData } from 'nuxt/app'
import { ref } from 'vue'
import type { MovieDetailsResponse } from '~/domain/models/Movie'
import { useImageUrl } from '~/composables/useImageUrl'
import { useMovieStore } from '~/stores/useMovieStore'
import FormComponent from '~/components/FormComponent.vue'
import CommentList from '~/components/CommentList.vue'
import CustomFallBack from '~/components/CustomFallBack.vue'

const route = useRoute()
const router = useRouter()
const movieStore = useMovieStore()

const isExpanded = ref(false)
const isOverviewExpanded = ref(false)
const movieId = ref<number>(Number(route.params.id))

const cachedData = movieStore.getMovieFromCache(movieId.value)

const { data, error, pending } = await useAsyncData(
  `movie-${movieId.value}`,
  async () => {
    if (cachedData) {
      return cachedData
    }
    const response = await $fetch<MovieDetailsResponse>(`/api/movieDetails/${movieId.value}`)
    movieStore.addMovieToCache(movieId.value, response)
    return response
  },

  {
    lazy: true,
  },
)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

const toggleOverview = () => {
  isOverviewExpanded.value = !isOverviewExpanded.value
}

watch(
  () => ({
    title: data.value?.title,
    overview: data.value?.overview,
    poster_path: data.value?.poster_path,
  }),
  ({ title, overview, poster_path }) => {
    useHead({
      title: title ?? 'Film inconnu',
      meta: [
        { name: 'description', content: overview ?? 'Aucune description disponible.' },
        { property: 'og:title', content: title ?? 'Film inconnu' },
        { property: 'og:description', content: overview ?? 'Aucune description disponible.' },
        {
          property: 'og:image',
          content: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : undefined,
        },
      ],
    })
  },
  { deep: true, immediate: true },
)

const goBack = () => {
  router.push('/')
}
</script>
<template>
  <div class="w-full mx-auto">
    <button class="back-button" aria-label="Retour à la liste des films" @click="goBack">
      ⬅️ Retour
    </button>
    <CustomMessage
      v-if="pending"
      text-props="Chargement..."
      style-props="text-gray-600 italic text-center flex justify-center text-2xl"
    />
    <div v-else-if="data">
      <div
        class="relative bg-gray-100 px-4 py-4 grid gap-4 md:grid-cols-3 w-full opacity-90 rounded-lg mb-10 shadow-2xl"
      >
        <div class="relative w-full" style="padding-bottom: 150%">
          <NuxtImg
            :src="useImageUrl(data?.poster_path).value"
            :alt="data.title"
            class="absolute inset-0 w-full object-contain rounded-xl"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 33vw, 100vw"
            densities="1x, 2x"
            format="webp"
            quality="80"
          />
        </div>

        <div class="md:col-span-2 flex flex-col space-y-4">
          <h1 v-if="data.title" class="text-2xl font-bold text-[#032441] pb-4">{{ data.title }}</h1>
          <div class="">
            <p class="text-gray-900 font-bold">Synopsis:</p>
            <div
              class="space-y-2 overflow-y-hidden relative transition-all duration-700 ease-[cubic-bezier(0.25, 0.8, 0.25, 1)] delay-75"
              :style="{ maxHeight: isOverviewExpanded ? '500px' : '38px' }"
            >
              <p class="text-gray-700 text-[clamp(0.8rem,1.2vw,1.2rem)] mb-1">
                {{ data.overview ? data.overview : 'Non disponible.' }}
              </p>
              <div
                v-if="!isOverviewExpanded && data?.overview && data.overview.length > 50"
                class="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-gray-200 to-transparent pointer-events-none"
              />
            </div>
            <button
              v-if="data.overview && data.overview.length > 50"
              class="text-[#032441] underline focus:outline-none cursor-pointer"
              @click="toggleOverview"
            >
              {{ isOverviewExpanded ? 'Voir moins' : 'Voir plus' }}
            </button>
          </div>
          <div class="py-4">
            <p class="text-gray-900 font-bold">Catégories:</p>
            <p>
              {{ data.categories ? data.categories : 'Non disponible.' }}
            </p>
          </div>

          <div class="py-2">
            <p class="text-[#032441] font-bold">
              {{ data.director.length > 1 ? 'Réalisateurs' : 'Réalisateur' }}:
            </p>
            <p>{{ data?.director ? data.director : 'Non disponible.' }}</p>
          </div>

          <div class="py-2">
            <p class="text-gray-900 font-bold">Les stars:</p>
            <div
              class="space-y-2 overflow-y-hidden relative transition-all duration-700 ease-[cubic-bezier(0.25, 0.8, 0.25, 1)] delay-75"
              :style="{ maxHeight: isExpanded ? '500px' : '38px' }"
            >
              <p class="text-gray-700 text-[clamp(0.8rem,1.2vw,1rem)] mb-1">
                {{ data?.stars ? data.stars : 'Non disponible.' }}
              </p>
              <div
                v-if="!isExpanded && data?.stars && data.stars.length > 50"
                class="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-gray-200 to-transparent pointer-events-none"
              />
            </div>
            <button
              v-if="data?.stars && data.stars.length > 50"
              class="text-[#032441] underline focus:outline-none cursor-pointer"
              @click="toggleExpand"
            >
              {{ isExpanded ? 'voir moins' : 'voir plus' }}
            </button>
          </div>

          <p class="text-gray-900 text-[clamp(0.8rem,1.2vw,1.2rem)] py-2">
            <span>Note TMDB :</span>
            {{ data?.vote_average ? data.vote_average : 'Non disponible.' }}
          </p>
          <p class="text-gray-900 text-[clamp(0.8rem,1.2vw,1.2rem)]">
            <span>Nombre de votants :</span>
            {{
              data.nombreVotants !== null && data.nombreVotants !== undefined
                ? data.nombreVotants
                : 'Non disponible.'
            }}
          </p>
        </div>
      </div>

      <ClientOnly>
        <template #fallback>
          <CustomFallBack message="Chargement..." />
        </template>

        <CommentList :movie-id="movieId" />
        <FormComponent :movie-id="movieId" />
      </ClientOnly>
    </div>

    <CustomMessage
      v-else-if="error"
      :text-props="'Impossible de récupérer les détails du film : ' + error.statusMessage"
    />
    <CustomMessage v-else text-props="Aucun détail de film trouvé." />
  </div>
</template>

<style scoped>
.back-button {
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

span {
  font-weight: bold;
  padding-inline-end: 0.5rem;
  color: brown;
}
</style>
