export interface MovieDetails {
  id: number
  title: string
  poster_path: string | null
  overview: string
  director: string | null
  cast: Array<{ name: string; character: string }>
  genres: { name: string }[]
  vote_average: number
  vote_count: number
}

export interface Crew {
  adult: boolean
  gender: number | null
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  credit_id: string
  department: string
  job: string
}

export interface MovieCredits {
  id: number
  cast: Cast[]
  crew: Crew[]
}
