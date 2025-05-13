<script setup lang="ts">
defineProps({
  isList: {
    type: Boolean,
    default: false,
  },
  count: {
    type: Number,
    default: 5,
  },
})
</script>
<template>
  <ul v-if="isList" class="skeleton-list">
    <li v-for="n in count" :key="n" class="skeleton-item">
      <div class="skeleton">
        <div class="skeleton-poster" />
        <div class="skeleton-info">
          <div class="skeleton-title" />
          <div class="skeleton-date" />
        </div>
      </div>
    </li>
  </ul>
  <div v-else class="skeleton">
    <div class="skeleton-poster" />
    <div class="skeleton-info">
      <div class="skeleton-title" />
      <div class="skeleton-date" />
    </div>
  </div>
</template>

<style scoped>
.skeleton-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  padding: 0;
  margin: 2rem 1rem;
}

.skeleton-item {
  list-style: none;
}

.skeleton {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background-color: #2a2a2a;
}

.skeleton-poster {
  width: 100%;
  aspect-ratio: 2 / 3;
  background: linear-gradient(90deg, #3d3d3d 25%, #4a4a4a 50%, #3d3d3d 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.skeleton-info {
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.skeleton-title {
  width: 80%;
  height: 1rem;
  background: linear-gradient(90deg, #3d3d3d 25%, #4a4a4a 50%, #3d3d3d 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
}

.skeleton-date {
  width: 50%;
  height: 0.8rem;
  background: linear-gradient(90deg, #3d3d3d 25%, #4a4a4a 50%, #3d3d3d 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
