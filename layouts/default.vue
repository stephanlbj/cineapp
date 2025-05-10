<template>
  <div>
    <header class="header-layout">
      <NuxtLink :to="'/'" class="text-[#ccd1d1] uppercase" aria-label="Accéder à CineApp">
        CineApp
      </NuxtLink>
    </header>
    <div class="w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 mx-auto mt-10">
      <slot />
    </div>
  </div>
</template>
<style scoped lang="scss">
.header-layout {
  background-color: #032441;
  color: white;
  padding: 1rem 2rem;
}
</style>
