<template>
  <h1>Détails du film : {{ movieId }}</h1>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const movieId = route.params.id
</script>
