🎬 Projet Nuxt 3 - Interface Cinéma avec TMDB

📌 Description
Ce projet est une interface de films construite avec Nuxt 3, utilisant Vue Query pour la gestion des requêtes API, et une approche Domain-Driven Design (DDD) pour une meilleure organisation du code. Il comporte :

Une page de liste de films avec défilement infini et filtre de recherche dynamique.

Une page de détails affichant des informations détaillées sur chaque film.

Un système de commentaires stockés en localStorage, avec validation stricte et tri du plus récent au plus ancien.

Ce projet est optimisé pour le SSR avec préfetch, afin d'éviter une double requête pour la première page en CSR et d'hydrater correctement le client.

🚀 Technologies utilisées
🔧 Framework & UI
NuxtJS 3 (SSR + Hydratation côté client)

Vue Query (Gestion optimisée des requêtes API + Cache)

VueUse (Utilitaires réactifs avancés)

Vuelidate / VeeValidate (Validation des formulaires)

Pinia (Gestion d'état avancée)

Vuetify (Optionnel, UI améliorée)

SCSS + Tailwind CSS (Styling & animations)

🧪 Tests & Qualité
Vitest + Nock (Tests unitaires et mocks API)

ESLint, Prettier, Stylelint (Linting et qualité du code)

Husky & lint-staged (Automatisation des checks avant commit)

🛠️ Installation & Configuration

1️⃣ Cloner le projet


git clone https://github.com/stephanlbj/cineapp.git
cd votre-repo


2️⃣ Installation des dépendances

npm install


3️⃣ Configuration des variables d’environnement
Crée un fichier .env à la racine avec :

env
NUXT_TMDB_API_KEY=

NUXT_TMDB_ACCESS_TOKEN=

NUXT_API_URL =https://api.themoviedb.org/3


🖥️ Lancement du projet

Mode développement

npm run dev

Build et lancement en production

npm run build
npm run preview

Lint & Format

npm run lint
npm run format

Exécution des tests

npm run test



📄 Structure du projet
📂 src/
├── 📂 domain/ # Modèles et logiques métier (DDD)
├── 📂 application/ # Services et cas d'utilisation métier
├── 📂 infrastructure/ # API externe, persistance, store
├── 📂 components/ # Composants Vue réutilisables
├── 📂 pages/ # Pages Nuxt générées automatiquement
├── 📂 composables/ # Fonctions réactives globales

├── nuxt.config.ts # Configuration Nuxt

🎬 Fonctionnalités
📌 Page Liste des films
✅ Défilement infini avec Vue Query ✅ Filtre de recherche dynamique ✅ Préfetch en SSR pour hydrater le client sans double requête


📜 Page Détail d’un film
✅ Affiche le titre, synopsis, réalisateur, acteurs, note, etc. ✅ Gestion des erreurs avec useErrorHandler()

💬 Système de commentaires
✅ Stockage en localStorage avec validation stricte ✅ Tri des commentaires du plus récent au plus ancien

🧪 Tests
✅ Tests unitaires
Exécutés avec Vitest, et Nock pour mocker les appels API.



🛠️ npm run test
✅ Lint & Formatting
Assure la qualité du code avec ESLint, Prettier, Stylelint.

npm run lint



💡 Améliorations possibles



Ajouter Vuetify pour une meilleure gestion des composants UI.

Intégrer TinyMCE comme éditeur WYSIWYG pour les commentaires.

Améliorer l’accessibilité et les animations avec VueUse Motion.
