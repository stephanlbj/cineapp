export function useValidationRules() {
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
    (value: number) => value !== 0 || 'La note du film est requise.',
    (value: number) =>
      (Number.isInteger(value) && value >= 1 && value <= 10) ||
      'La note doit être un nombre entier entre 1 et 10.',
  ]

  return {
    nameRules,
    messageRules,
    ratingRules,
  }
}
