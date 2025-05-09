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
