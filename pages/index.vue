<template>
  <div>
    <div v-if="isLoading">Chargement...</div>

    <div v-if="isError">Erreur lors de la récupération des films.</div>

    <div v-if="data">
      <div v-for="movie in movies" :key="movie.id">
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.overview }}</p>
        <NuxtImg
          :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
          alt="Poster"
        />
      </div>
    </div>

    <!-- <button v-if="hasNextPage && !isFetchingNextPage" @click="fetchNextPage">
      Charger plus
    </button> -->

    <div v-if="isFetchingNextPage">Chargement de la prochaine page...</div>
  </div>
</template>

<script setup lang="ts">
import { useMovieQuery } from "~/composables/useMovieQuery";

const {
  data,
  isLoading,
  isError,
  //fetchNextPage,
  //hasNextPage,
  isFetchingNextPage,
} = useMovieQuery();

const movies = computed(
  () => data?.value?.pages?.flatMap((page) => page.results) ?? [],
);
</script>
