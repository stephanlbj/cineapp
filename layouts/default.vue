<template>
  <div>
    <header class="header-layout">
      <NuxtLink :to="'/'" class="text-[#ccd1d1] uppercase" aria-label="Accéder à CineApp">
        CineApp
      </NuxtLink>
    </header>
    <slot />
  </div>
</template>
<style scoped lang="scss">
.header-layout {
  background-color: #032441;
  color: white;
  padding: 1rem 2rem;
}
</style>
