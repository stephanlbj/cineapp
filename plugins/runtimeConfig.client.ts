import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  nuxtApp.provide("apiConfig", {
    apiBaseUrl: config.public.apiBaseUrl,
    apiKey: config.public.apiKey,
  });
});
