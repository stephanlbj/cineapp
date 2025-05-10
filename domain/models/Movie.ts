export interface Movie {
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string
  backdrop_path: string
  genre_ids: number[]
  release_date: string
  popularity: number
  vote_average: number
  vote_count: number
  original_language: string
  adult: boolean
  video: boolean
}

export interface Genre {
  id: number
  name: string
}

interface BelongsToCollection {
  id: number
  name: string
  poster_path: string | null
  backdrop_path: string | null
}

interface ProductionCompany {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

interface ProductionCountry {
  iso_3166_1: string
  name: string
}

interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

export interface MovieDetailsFull {
  adult: boolean
  backdrop_path: string | null
  belongs_to_collection: BelongsToCollection | null
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string | null
  origin_country: string[]
  original_language: string
  original_title: string
  overview: string | null
  popularity: number
  poster_path: string | null
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  release_date: string
  revenue: number
  runtime: number | null
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string | null
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface MoviePage {
  results: Movie[]
  total_pages: number
  total_results: number
}
export interface Cast {
  adult: boolean
  gender: number | null
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export interface MovieDetailsResponse extends MovieDetailsFull {
  director: string
  categories: string
  noteTMDB: number | string
  nombreVotants: number | string
  stars?: string
}
